import { dbConnect } from '../../../../models/StudentDetails';
import StudentDetails from '../../../../models/StudentDetails';
import formidable from 'formidable';
import { uploadToCloudinary, testCloudinaryConnection } from '../../../../lib/cloudinary';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req) => {
  const options = {
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB file limit
    multiples: false, // Allow only one image to be uploaded
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
    const { fullName, dateOfBirth, email, mobileNumber, identityProofType, identityProofNumber, course } = fields;
    const studentImageFile = files.studentImage?.[0];

    // Convert fields to strings if they are arrays
    const studentData = {
      fullName: Array.isArray(fullName) ? fullName[0] : fullName,
      dateOfBirth,
      email: Array.isArray(email) ? email[0] : email,
      mobileNumber: Array.isArray(mobileNumber) ? mobileNumber[0] : mobileNumber,
      identityProofType: Array.isArray(identityProofType) ? identityProofType[0] : identityProofType,
      identityProofNumber: Array.isArray(identityProofNumber) ? identityProofNumber[0] : identityProofNumber,
      course: Array.isArray(course) ? course[0] : course,
    };

    if (!studentImageFile) {
      return res.status(400).json({ error: 'Image file is missing' });
    }

    // Verify the image file exists at its path
    if (!fs.existsSync(studentImageFile.filepath)) {
      return res.status(400).json({ error: 'Image file not found on server' });
    }

    // Upload image to Cloudinary
    const imageUpload = await uploadToCloudinary(studentImageFile, {
      folder: 'students/images',
      public_id: uuidv4(),
      format: 'jpg',
    });

    // Save student data with Cloudinary image URL
    const newStudent = new StudentDetails({
      ...studentData,
      studentImage: imageUpload.secure_url,  // Store the URL of the image uploaded to Cloudinary
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', newStudent });

  } catch (error) {
    console.error('Error while adding student:', error);
    res.status(500).json({ error: 'Error saving student', details: error.message });
  }
}
