import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_tope_2026';
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.LOGIN_MAX_ATTEMPTS || '5', 10);
const LOGIN_WINDOW_MS = (parseInt(process.env.LOGIN_WINDOW_MINUTES || '15', 10)) * 60 * 1000;
const MONGODB_URI = process.env.MONGODB_URI;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Ensure server data directory exists for backup/migration purposes
const dataDir = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const authFile = path.join(dataDir, 'admin-auth.json');
const submissionsFile = path.join(dataDir, 'submissions.json');

// --- MONGOOSE SCHEMAS & MODELS ---
const submissionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  refNo: { type: String, required: true, unique: true },
  fullName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  village: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  status: { type: String, default: 'New' },
  adminNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const adminAuthSchema = new mongoose.Schema({
  key: { type: String, default: 'primary_admin', unique: true },
  passwordHash: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const SubmissionModel = mongoose.model('Submission', submissionSchema);
const AdminAuthModel = mongoose.model('AdminAuth', adminAuthSchema);

let isDbConnected = false;

// Connect to MongoDB Atlas (or fail clearly in production)
async function connectDatabase() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      isDbConnected = true;
      console.log('[DATABASE] Successfully connected to MongoDB Atlas.');
      await migrateDataToMongo();
    } catch (err) {
      console.error('[DATABASE ERROR] Failed connecting to MongoDB Atlas:', err.message);
      if (IS_PRODUCTION) {
        console.error('[CRITICAL] Running in production without a valid database connection is not permitted.');
      }
    }
  } else {
    if (IS_PRODUCTION) {
      console.error('[CRITICAL] MONGODB_URI is required in production environment.');
    } else {
      console.log('[DATABASE] No MONGODB_URI provided. Running in local JSON development mode.');
    }
  }
}

// Data Migration function: safely imports local JSON records into MongoDB if they don't already exist
async function migrateDataToMongo() {
  try {
    // 1. Migrate Admin Auth
    const existingAdminInDb = await AdminAuthModel.findOne({ key: 'primary_admin' });
    if (!existingAdminInDb) {
      if (fs.existsSync(authFile)) {
        try {
          const authData = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
          if (authData.passwordHash) {
            await AdminAuthModel.create({
              key: 'primary_admin',
              passwordHash: authData.passwordHash,
              updatedAt: authData.updatedAt ? new Date(authData.updatedAt) : new Date()
            });
            console.log('[MIGRATION] Admin credentials migrated from admin-auth.json to MongoDB.');
          }
        } catch (e) {
          console.error('[MIGRATION] Could not read local auth file:', e.message);
        }
      }

      // If still no admin, initialize with default password hash from env
      const stillNoAdmin = await AdminAuthModel.findOne({ key: 'primary_admin' });
      if (!stillNoAdmin) {
        const defaultPassword = process.env.ADMIN_PASSWORD || 'rajesh_tope_secure_2026!';
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(defaultPassword, salt);
        await AdminAuthModel.create({
          key: 'primary_admin',
          passwordHash: hash,
          updatedAt: new Date()
        });
        console.log('[SECURITY] Initial admin password hash created securely in MongoDB with bcrypt (12 rounds).');
      }
    }

    // 2. Migrate Submissions
    if (fs.existsSync(submissionsFile)) {
      try {
        const fileContent = fs.readFileSync(submissionsFile, 'utf-8');
        const localList = JSON.parse(fileContent);
        if (Array.isArray(localList) && localList.length > 0) {
          let migratedCount = 0;
          for (const item of localList) {
            const exists = await SubmissionModel.findOne({ refNo: item.refNo });
            if (!exists) {
              await SubmissionModel.create({
                id: item.id || `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                refNo: item.refNo,
                fullName: item.fullName,
                mobile: item.mobile,
                village: item.village,
                subject: item.subject,
                message: item.message,
                date: item.date || new Date().toISOString().split('T')[0],
                status: item.status || 'New',
                adminNotes: item.adminNotes || ''
              });
              migratedCount++;
            }
          }
          if (migratedCount > 0) {
            console.log(`[MIGRATION] Successfully migrated ${migratedCount} existing submissions into MongoDB.`);
          }
        }
      } catch (err) {
        console.error('[MIGRATION] Error reading local submissions during migration:', err.message);
      }
    }
  } catch (err) {
    console.error('[MIGRATION ERROR]', err.message);
  }
}

// Local JSON fallback initialization (development only)
async function initLocalAuth() {
  if (!fs.existsSync(authFile)) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'rajesh_tope_secure_2026!';
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(defaultPassword, salt);
    fs.writeFileSync(authFile, JSON.stringify({ passwordHash: hash, updatedAt: new Date().toISOString() }, null, 2));
    console.log('[SECURITY] Initial local admin password hash created securely with bcrypt (12 rounds).');
  }
}
if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2));
}
await initLocalAuth();
await connectDatabase();

// --- DATA ACCESS HELPERS (MongoDB with strict error on production failure) ---
async function getAllSubmissions() {
  if (isDbConnected) {
    const docs = await SubmissionModel.find().sort({ createdAt: -1, _id: -1 }).lean();
    return docs.map(d => ({
      id: d.id,
      refNo: d.refNo,
      fullName: d.fullName,
      mobile: d.mobile,
      village: d.village,
      subject: d.subject,
      message: d.message,
      date: d.date,
      status: d.status,
      adminNotes: d.adminNotes || ''
    }));
  }
  if (IS_PRODUCTION) {
    throw new Error('Database connection unavailable in production.');
  }
  try {
    return JSON.parse(fs.readFileSync(submissionsFile, 'utf-8'));
  } catch {
    return [];
  }
}

async function createSubmission(data) {
  if (isDbConnected) {
    const doc = await SubmissionModel.create(data);
    return doc.toObject();
  }
  if (IS_PRODUCTION) {
    throw new Error('Database connection unavailable in production.');
  }
  const current = JSON.parse(fs.readFileSync(submissionsFile, 'utf-8') || '[]');
  current.unshift(data);
  fs.writeFileSync(submissionsFile, JSON.stringify(current, null, 2));
  return data;
}

async function updateSubmissionStatus(id, updateFields) {
  if (isDbConnected) {
    const updated = await SubmissionModel.findOneAndUpdate({ id }, { $set: updateFields }, { new: true }).lean();
    return updated;
  }
  if (IS_PRODUCTION) {
    throw new Error('Database connection unavailable in production.');
  }
  const submissions = JSON.parse(fs.readFileSync(submissionsFile, 'utf-8') || '[]');
  const idx = submissions.findIndex(s => s.id === id);
  if (idx === -1) return null;
  submissions[idx] = { ...submissions[idx], ...updateFields };
  fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
  return submissions[idx];
}

async function getAdminPasswordHash() {
  if (isDbConnected) {
    const doc = await AdminAuthModel.findOne({ key: 'primary_admin' });
    return doc ? doc.passwordHash : null;
  }
  if (IS_PRODUCTION) {
    throw new Error('Database connection unavailable in production.');
  }
  try {
    const content = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
    return content.passwordHash;
  } catch (e) {
    return null;
  }
}

async function updateAdminPasswordHash(newHash) {
  if (isDbConnected) {
    await AdminAuthModel.findOneAndUpdate(
      { key: 'primary_admin' },
      { $set: { passwordHash: newHash, updatedAt: new Date() } },
      { upsert: true, new: true }
    );
    return;
  }
  if (IS_PRODUCTION) {
    throw new Error('Database connection unavailable in production.');
  }
  fs.writeFileSync(authFile, JSON.stringify({ passwordHash: newHash, updatedAt: new Date().toISOString() }, null, 2));
}

// In-memory rate limiters (Invisible server-side security)
const loginAttempts = new Map(); // ip => { count, resetTime }
const submissionRateLimits = new Map(); // ip => { count, resetTime }

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : '*';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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

// --- HEALTH CHECK ROUTE ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      connected: isDbConnected,
      engine: isDbConnected ? 'MongoDB Atlas' : 'Local JSON File (Dev Only)'
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// --- PUBLIC CONNECT ROUTES ---

// Submit Representation (Strict 5 fields only)
app.post('/api/submissions', async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();

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
    return res.status(400).json({ error: 'Detailed representation (at least 10 characters) is required.' });
  }

  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const refNo = `RT-${new Date().getFullYear()}-${randomSuffix}`;
  const newId = `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newSubmission = {
    id: newId,
    refNo,
    fullName: fullName.trim(),
    mobile: cleanMobile,
    village: village.trim(),
    subject: subject.trim(),
    message: message.trim(),
    date: new Date().toISOString().split('T')[0],
    status: 'New',
    adminNotes: ''
  };

  try {
    await createSubmission(newSubmission);
    console.log(`[PUBLIC CONNECT] New submission received: ${refNo} from ${fullName.trim()} (${village.trim()})`);
    return res.status(201).json({
      success: true,
      refNo,
      message: 'Representation registered successfully.'
    });
  } catch (err) {
    console.error('[SUBMISSION ERROR]', err.message);
    return res.status(500).json({ error: 'Database service error. Please try again later.' });
  }
});

// --- ADMIN SECURE API ROUTES ---

// Admin Login
app.post('/api/admin/login', loginRateLimiter, async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const { password } = req.body || {};

  if (!password || typeof password !== 'string') {
    recordLoginFailure(ip);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    const storedHash = await getAdminPasswordHash();
    if (!storedHash) {
      recordLoginFailure(ip);
      return res.status(500).json({ error: 'Authentication service not initialized' });
    }

    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      recordLoginFailure(ip);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    recordLoginSuccess(ip);

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
  } catch (err) {
    console.error('[AUTH ERROR]', err.message);
    return res.status(500).json({ error: 'Authentication service error' });
  }
});

// Admin Get All Submissions (Protected)
app.get('/api/submissions', verifyAdminToken, async (req, res) => {
  try {
    const list = await getAllSubmissions();
    return res.json({ submissions: list });
  } catch (err) {
    console.error('[FETCH SUBMISSIONS ERROR]', err.message);
    return res.status(500).json({ error: 'Failed to retrieve submissions from database' });
  }
});

// Admin Update Submission Status / Notes (Protected)
app.patch('/api/submissions/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body || {};

  const validStatuses = ['New', 'Under Review', 'Action Taken', 'Resolved', 'Closed'];
  const updateData = {};

  if (status) {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    updateData.status = status;
  }

  if (adminNotes !== undefined) {
    updateData.adminNotes = String(adminNotes);
  }

  try {
    const updated = await updateSubmissionStatus(id, updateData);
    if (!updated) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    return res.json({ success: true, submission: updated });
  } catch (err) {
    console.error('[UPDATE SUBMISSION ERROR]', err.message);
    return res.status(500).json({ error: 'Failed to update submission in database' });
  }
});

// Admin Verify Token
app.get('/api/admin/verify', verifyAdminToken, (req, res) => {
  return res.json({ valid: true, admin: req.admin });
});

// Admin Change Password (Protected)
app.post('/api/admin/change-password', verifyAdminToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both current password and new password are required.' });
  }

  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  try {
    const hash = await getAdminPasswordHash();
    const match = await bcrypt.compare(currentPassword, hash);
    if (!match) {
      return res.status(401).json({ error: 'Current password verification failed.' });
    }

    const salt = await bcrypt.genSalt(12);
    const newHash = await bcrypt.hash(newPassword, salt);
    await updateAdminPasswordHash(newHash);

    console.log('[SECURITY] Admin password was successfully changed and re-hashed with bcrypt (12 rounds).');

    return res.json({
      success: true,
      message: 'Password changed successfully.'
    });
  } catch (err) {
    console.error('[PASSWORD CHANGE ERROR]', err.message);
    return res.status(500).json({ error: 'Failed to update password in database' });
  }
});

// Admin Logout
app.post('/api/admin/logout', verifyAdminToken, (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// --- STATIC ASSET SERVING FOR PRODUCTION (UNIFIED RENDER SERVICE) ---
const distPath = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Client-side SPA routing fallback: send index.html for non-API routes (Express 5 compatible)
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start Express server
app.listen(PORT, () => {
  console.log(`[SERVER] Rajesh Tope Political Portal API running on http://localhost:${PORT}`);
});
