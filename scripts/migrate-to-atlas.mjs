import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('[ERROR] MONGODB_URI is not set in your .env file.');
  console.error('Please configure your MONGODB_URI in .env before running this migration.');
  process.exit(1);
}

const dataDir = path.resolve(__dirname, '..', 'data');
const authFile = path.join(dataDir, 'admin-auth.json');
const submissionsFile = path.join(dataDir, 'submissions.json');

// Define Schemas identical to production
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

async function runDirectMigration() {
  console.log('--- RAJESH TOPE PORTAL: DIRECT DATABASE MIGRATION ---');

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✔ Connected successfully to MongoDB Atlas.');
  } catch (err) {
    console.error('✖ Connection failed to MongoDB Atlas:', err.message);
    process.exit(1);
  }

  // 1. Migrate Admin Auth Hash
  console.log('\n[1/2] Checking Admin Authentication records...');
  try {
    const existingAdmin = await AdminAuthModel.findOne({ key: 'primary_admin' });
    if (existingAdmin) {
      console.log('✔ Existing admin credentials already found in MongoDB Atlas. Preserving existing record (skipped overwrite).');
    } else {
      if (fs.existsSync(authFile)) {
        const authData = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
        if (authData.passwordHash) {
          await AdminAuthModel.create({
            key: 'primary_admin',
            passwordHash: authData.passwordHash,
            updatedAt: authData.updatedAt ? new Date(authData.updatedAt) : new Date()
          });
          console.log('✔ Successfully imported admin authentication hash from data/admin-auth.json to MongoDB.');
        } else {
          console.log('⚠ data/admin-auth.json did not contain a valid hash. Server will initialize it from ADMIN_PASSWORD.');
        }
      } else {
        console.log('ℹ Local data/admin-auth.json not found. Server will initialize on first boot using ADMIN_PASSWORD.');
      }
    }
  } catch (err) {
    console.error('✖ Error migrating admin credentials:', err.message);
  }

  // 2. Migrate Submissions
  console.log('\n[2/2] Migrating Public Connect Submissions...');
  let importedCount = 0;
  let skippedCount = 0;
  let totalLocal = 0;

  if (fs.existsSync(submissionsFile)) {
    try {
      const submissions = JSON.parse(fs.readFileSync(submissionsFile, 'utf-8'));
      if (Array.isArray(submissions)) {
        totalLocal = submissions.length;
        console.log(`Found ${totalLocal} local submission record(s) to verify.`);

        for (const sub of submissions) {
          const existing = await SubmissionModel.findOne({ refNo: sub.refNo });
          if (existing) {
            skippedCount++;
          } else {
            await SubmissionModel.create({
              id: sub.id || `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              refNo: sub.refNo,
              fullName: sub.fullName,
              mobile: sub.mobile,
              village: sub.village,
              subject: sub.subject,
              message: sub.message,
              date: sub.date,
              status: sub.status || 'New',
              adminNotes: sub.adminNotes || ''
            });
            importedCount++;
          }
        }
      }
    } catch (err) {
      console.error('✖ Error reading local submissions.json:', err.message);
    }
  } else {
    console.log('ℹ Local data/submissions.json file not found.');
  }

  console.log('\n--- MIGRATION SUMMARY ---');
  console.log(`Total Local Submissions Found : ${totalLocal}`);
  console.log(`Successfully Imported to Atlas: ${importedCount}`);
  console.log(`Skipped (Already in Atlas)    : ${skippedCount}`);
  console.log('Original local files remain intact and unmodified.');

  const totalInDb = await SubmissionModel.countDocuments();
  console.log(`Total Submissions now in Atlas: ${totalInDb}`);
  console.log('-------------------------\n');

  await mongoose.disconnect();
  console.log('✔ Database connection closed cleanly.');
}

runDirectMigration();
