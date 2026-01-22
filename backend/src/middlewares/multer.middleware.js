import multer from "multer";

// store files in memory as buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
  files: 6
};

const options = {
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
};

const upload = multer(options);

export default upload;
