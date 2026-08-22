import { cloudinary } from '../config/cloudinary.js';
import { isImage, isVideo } from '../middleware/upload.js';
import { AppError } from '../middleware/errorHandler.js';

const streamUpload = (buffer, options) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });

export const uploadToCloudinary = async (file, folder) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new AppError('Cloudinary is not configured.', 500);
  }

  const options = {
    folder: `tinytwirl/${folder}`,
    resource_type: isVideo(file.mimetype) ? 'video' : 'image',
  };

  if (isImage(file.mimetype)) {
    options.quality = 'auto';
    options.fetch_format = 'auto';
  }

  if (isVideo(file.mimetype)) {
    options.eager = [{ width: 640, height: 360, crop: 'fill', format: 'jpg' }];
    options.eager_async = false;
  }

  const result = await streamUpload(file.buffer, options);

  let thumbnailUrl = '';
  if (isVideo(file.mimetype)) {
    thumbnailUrl = cloudinary.url(result.public_id, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [{ width: 640, height: 360, crop: 'fill' }],
    });
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
    thumbnailUrl,
    type: isVideo(file.mimetype) ? 'VIDEO' : 'IMAGE',
  };
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
  }
};

export const getResourceType = (publicId, type) => {
  if (type === 'VIDEO') return 'video';
  return 'image';
};
