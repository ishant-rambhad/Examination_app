import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  aadhaar: {
    type: String,
    required: true,
    unique: true,  // Ensure Aadhaar is unique
    sparse: true,  // This will prevent null values from being treated as duplicates
  },
  mobile: { type: String, required: true },
  technology: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;