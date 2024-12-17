import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import fs from 'fs';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log Cloudinary configuration for verification
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to create a readable stream from a buffer
const bufferToStream = (buffer) => {
  const readableStream = new Readable();
  readableStream.push(buffer);   // Push the buffer into the stream
  readableStream.push(null);     // End the stream
  return readableStream;
};

// Function to upload files to Cloudinary
export const uploadToCloudinary = async (file, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);   // Reject on error
      } else {
        resolve(result);  // Resolve on success
      }
    });

    // Read the file into a buffer
    const fileStream = fs.createReadStream(file.filepath);  // Access file using `filepath`
    
    // Pipe the file stream to Cloudinary
    fileStream.pipe(stream);
  });
};

// Function to test Cloudinary connection
export const testCloudinaryConnection = () => {
  return new Promise((resolve, reject) => {
    cloudinary.api.ping((error, result) => {
      if (error) {
        console.error('Cloudinary connection test failed:', error);
        reject(error);
      } else {
        console.log('Cloudinary connection successful:', result);
        resolve(result);
      }
    });
  });
};

export default cloudinary;
