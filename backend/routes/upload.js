import multer from 'multer';
import fs from 'fs';

// Create a storage engine using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = '/Users/yaroslav.k0/Documents/code/JHCлянка/auxilium/backend/data/tmp';
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

// Function to handle file uploads
const handleFileUpload = async (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to upload image" }));
        reject(err); // Reject the promise
        return;
      }

      const imagePath = req.file.path;
      console.log("File uploaded successfully", imagePath);
      resolve(imagePath); // Resolve the promise with the image path
    });
  });
};

export default handleFileUpload;
