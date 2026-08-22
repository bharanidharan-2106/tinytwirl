import multer from 'multer';

const storage = multer.memoryStorage();

const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const videoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];

const fileFilter = (req, file, cb) => {
  const allowed = [...imageTypes, ...videoTypes];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM, MOV, AVI.'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export const isImage = (mimetype) => imageTypes.includes(mimetype);
export const isVideo = (mimetype) => videoTypes.includes(mimetype);
