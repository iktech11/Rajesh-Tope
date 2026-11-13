import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_tope_2026';
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.LOGIN_MAX_ATTEMPTS || '5', 10);
const LOGIN_WINDOW_MS = (parseInt(process.env.LOGIN_WINDOW_MINUTES || '15', 10)) * 60 * 1000;

// Ensure server data directory exists
const dataDir = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const authFile = path.join(dataDir, 'admin-auth.json');
const submissionsFile = path.join(dataDir, 'submissions.json');

// Initialize admin hash securely on first run
async function initAuth() {
  if (!fs.existsSync(authFile)) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'rajesh_tope_secure_2026!';
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(defaultPassword, salt);
    fs.writeFileSync(authFile, JSON.stringify({ passwordHash: hash, updatedAt: new Date().toISOString() }, null, 2));
    console.log('[SECURITY] Initial admin password hash created securely with bcrypt (12 rounds).');
  }
}
await initAuth();

// Initialize submissions file if empty
if (!fs.existsSync(submissionsFile)) {
  const seedSubmissions = [
    {
      id: 'sub-seed-1',
      refNo: 'RT-2026-849201',
      fullName: 'दत्तात्रय रामराव देशमुख',
      mobile: '9822014455',
      village: 'कुंभार पिंपळगाव',
      subject: 'शेती कालव्याचे पाणी टेल-एंडपर्यंत पोहोचण्याबाबत',
      message: 'आमच्या गावाजवळील वितरिकेत गाळ साचल्यामुळे शेवटच्या ५० शेतकऱ्यांपर्यंत पाणी येत नाही. कृपया कालवा दुरुस्तीचे आदेश द्यावेत.',
      date: '2026-03-01',
      status: 'New'
    },
    {
      id: 'sub-seed-2',
      refNo: 'RT-2026-621840',
      fullName: 'सुनील किसनराव चव्हाण',
      mobile: '9421087766',
      village: 'राणी उंचेगाव',
      subject: 'प्राथमिक आरोग्य केंद्रातील रुग्णवाहिका दुरुस्ती',
      message: 'उपकेंद्रातील रुग्णवाहिका मागील १५ दिवसांपासून बंद अवस्थेत आहे. आपत्कालीन प्रसंगी रुग्णांचे हाल होत आहेत.',
      date: '2026-02-28',
      status: 'Under Review',
      adminNotes: 'तालुका आरोग्य अधिकाऱ्यांशी चर्चा झाली आहे. मेकॅनिक पाठवून वाहन दुरुस्त करण्याचे निर्देश दिले.'
    }
  ];
  fs.writeFileSync(submissionsFile, JSON.stringify(seedSubmissions, null, 2));
}

function readSubmissions() {
  try {
    return JSON.parse(fs.readFileSync(submissionsFile, 'utf-8'));
  } catch {
    return [];
  }
}

function saveSubmissions(data) {
  fs.writeFileSync(submissionsFile, JSON.stringify(data, null, 2));
}

function getStoredPasswordHash() {
  try {
    const content = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
    return content.passwordHash;
  } catch (e) {
    console.error('Failed reading auth hash:', e.message);
    return null;
  }
}

function updateStoredPasswordHash(newHash) {
  fs.writeFileSync(authFile, JSON.stringify({ passwordHash: newHash, updatedAt: new Date().toISOString() }, null, 2));
}

// In-memory rate limiters (Invisible server-side security)
const loginAttempts = new Map(); // ip => { count, resetTime }
const submissionRateLimits = new Map(); // ip => { count, resetTime }

// Middleware
app.use(cors());
app.use(express.json({ limit: '50kb' }));

// Middleware: Verify Admin JWT Token
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }
}

// Rate Limiter for Login (Brute Force Protection)
function loginRateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record) {
    if (now < record.resetTime) {
      if (record.count >= MAX_LOGIN_ATTEMPTS) {
        const waitMinutes = Math.ceil((record.resetTime - now) / 60000);
        return res.status(429).json({
          error: `Too many login attempts. Please try again after ${waitMinutes} minute(s).`
        });
      }
    } else {
      loginAttempts.set(ip, { count: 0, resetTime: now + LOGIN_WINDOW_MS });
    }
  } else {
    loginAttempts.set(ip, { count: 0, resetTime: now + LOGIN_WINDOW_MS });
  }
  next();
}

function recordLoginFailure(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, resetTime: now + LOGIN_WINDOW_MS };
  record.count += 1;
  loginAttempts.set(ip, record);
}

function recordLoginSuccess(ip) {
  loginAttempts.delete(ip);
}

// --- PUBLIC CONNECT ROUTES ---

// Submit Representation (Strict 5 fields only)
app.post('/api/submissions', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Rate limit: max 10 submissions per 5 minutes per IP
  const rate = submissionRateLimits.get(ip) || { count: 0, resetTime: now + 5 * 60 * 1000 };
  if (now > rate.resetTime) {
    rate.count = 0;
    rate.resetTime = now + 5 * 60 * 1000;
  }
  if (rate.count >= 10) {
    return res.status(429).json({ error: 'Submission limit reached. Please wait a few minutes before submitting again.' });
  }
  rate.count += 1;
  submissionRateLimits.set(ip, rate);

  const body = req.body || {};
  const { fullName, mobile, village, subject, message } = body;

  // Strict Validation of exactly the 5 requested fields
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return res.status(400).json({ error: 'Full Name is required.' });
  }

  const cleanMobile = (typeof mobile === 'string' ? mobile : String(mobile || '')).replace(/\D/g, '');
  if (!cleanMobile || cleanMobile.length !== 10) {
    return res.status(400).json({ error: 'Valid 10-digit Mobile Number is required.' });
  }

  if (!village || typeof village !== 'string' || !village.trim()) {
    return res.status(400).json({ error: 'Village / City is required.' });
  }

  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    return res.status(400).json({ error: 'Subject is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Detailed Representation / Message (min 10 characters) is required.' });
  }

  const refNo = `RT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const newSubmission = {
    id: `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    refNo,
    fullName: fullName.trim(),
    mobile: cleanMobile,
    village: village.trim(),
    subject: subject.trim(),
    message: message.trim(),
    date: new Date().toISOString().split('T')[0],
    status: 'New'
  };

  const submissions = readSubmissions();
  submissions.unshift(newSubmission);
  saveSubmissions(submissions);

  console.log(`[PUBLIC CONNECT] New submission received: ${refNo} from ${fullName.trim()} (${village.trim()})`);

  return res.status(201).json({
    success: true,
    refNo,
    message: 'Representation registered successfully.'
  });
});

// Admin: Get all submissions (Protected)
app.get('/api/submissions', verifyAdminToken, (req, res) => {
  const submissions = readSubmissions();
  return res.json({ submissions });
});

// Admin: Update submission workflow status / notes (Protected)
app.patch('/api/submissions/:id', verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const validStatuses = ['New', 'Under Review', 'Action Taken', 'Closed'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  const submissions = readSubmissions();
  const index = submissions.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Submission not found.' });
  }

  if (status) submissions[index].status = status;
  if (adminNotes !== undefined) submissions[index].adminNotes = String(adminNotes).trim();

  saveSubmissions(submissions);
  return res.json({ success: true, submission: submissions[index] });
});

// --- ADMIN AUTHENTICATION ROUTES ---

// Admin Login (Rate-Limited, Bcrypt verification, Generic error messages)
app.post('/api/admin/login', loginRateLimiter, async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    recordLoginFailure(ip);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const hash = getStoredPasswordHash();
  if (!hash) {
    recordLoginFailure(ip);
    return res.status(500).json({ error: 'Server authentication configuration error' });
  }

  const match = await bcrypt.compare(password, hash);
  if (!match) {
    recordLoginFailure(ip);
    // Generic error message - does not reveal system specifics
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  recordLoginSuccess(ip);

  // Issue secure JWT token with 8 hours expiration
  const token = jwt.sign(
    { role: 'admin', authorizedAt: Date.now() },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  console.log(`[AUTH] Admin successfully authenticated from IP ${ip}`);

  return res.json({
    success: true,
    token,
    expiresIn: '8h',
    message: 'Authentication successful'
  });
});

// Admin Verify Token
app.get('/api/admin/verify', verifyAdminToken, (req, res) => {
  return res.json({ valid: true, admin: req.admin });
});

// Admin Change Password (Protected)
app.post('/api/admin/change-password', verifyAdminToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both current password and new password are required.' });
  }

  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  const hash = getStoredPasswordHash();
  const match = await bcrypt.compare(currentPassword, hash);
  if (!match) {
    return res.status(401).json({ error: 'Current password verification failed.' });
  }

  const salt = await bcrypt.genSalt(12);
  const newHash = await bcrypt.hash(newPassword, salt);
  updateStoredPasswordHash(newHash);

  console.log('[SECURITY] Admin password was successfully changed and re-hashed with bcrypt (12 rounds).');

  return res.json({
    success: true,
    message: 'Password changed successfully.'
  });
});

// Admin Logout
app.post('/api/admin/logout', verifyAdminToken, (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`[SERVER] Rajesh Tope Political Portal API running on http://localhost:${PORT}`);
});

