import multer from 'multer';

// Memory storage for direct Cloudinary uploads
const storage = multer.memoryStorage();

const uploadCloudinary = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png'];
    const ext = file.originalname.toLowerCase().split('.').pop();
    if (allowed.includes(`.${ext}`)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, .png files are allowed!'));
    }
  },
});

export default uploadCloudinary;
