import formidable from 'formidable';
import { uploadToCloudinary, testCloudinaryConnection } from '../../../../lib/cloudinary';
import dbConnect from '../../../../lib/dbConnect';
import Employee from '../../../../models/Employee';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse form data using formidable
const parseForm = async (req) => {
  const options = {
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB file limit
    multiples: true, // Allow multiple files to be uploaded
  };

  return new Promise((resolve, reject) => {
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        reject(err);
        return;
      }
      
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ensure MongoDB connection
    await dbConnect();
    await testCloudinaryConnection();

    // Parse form data
    const { fields, files } = await parseForm(req);

    // Extract fields and ensure they are strings
    const { name, dob, address, aadhaar, mobile, technology } = fields;
    const resumeFile = files.resume?.[0];
    const imageFile = files.image?.[0];

    // Convert fields to strings if they are arrays
    const employeeData = {
      name: Array.isArray(name) ? name[0] : name,
      dob,
      address: Array.isArray(address) ? address[0] : address,
      aadhaar: Array.isArray(aadhaar) ? aadhaar[0] : aadhaar,
      mobile: Array.isArray(mobile) ? mobile[0] : mobile,
      technology: Array.isArray(technology) ? technology[0] : technology,
    };

    if (!resumeFile || !imageFile) {
      return res.status(400).json({ error: 'Resume or image file is missing' });
    }

    // Verify the files exist at their paths
    if (!fs.existsSync(resumeFile.filepath) || !fs.existsSync(imageFile.filepath)) {
      return res.status(400).json({ error: 'File not found on server' });
    }

    // Upload resume to Cloudinary
    const resumeUpload = await uploadToCloudinary(resumeFile, {
      folder: 'employees/resumes',
      resource_type: 'raw',
      public_id: uuidv4(),
    });

    // Upload image to Cloudinary
    const imageUpload = await uploadToCloudinary(imageFile, {
      folder: 'employees/photos',
      public_id: uuidv4(),
      format: 'jpg',
    });

    // Create new employee in MongoDB
    const newEmployee = new Employee({
      ...employeeData,
      resumeUrl: resumeUpload.secure_url,
      imageUrl: imageUpload.secure_url,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee added successfully', newEmployee });

  } catch (error) {
    console.error('Error while adding employee:', error);
    res.status(500).json({ error: 'Error saving employee', details: error.message });
  }
}
