import Media from '../models/Media.js';
import { uploadToCloudinary, deleteFromCloudinary, getResourceType } from '../services/cloudinaryService.js';
import { AppError } from '../middleware/errorHandler.js';

export const getPublicMedia = async (req, res) => {
  const { type, category, featured } = req.query;
  const filter = { isPublished: true };

  if (type) filter.type = type.toUpperCase();
  if (category) filter.category = category.toUpperCase();
  if (featured === 'true') filter.isFeatured = true;

  const media = await Media.find(filter).sort({ createdAt: -1 });
  res.json(media);
};

export const getAdminMedia = async (req, res) => {
  const media = await Media.find().sort({ createdAt: -1 });
  res.json(media);
};

export const createMedia = async (req, res) => {
  if (!req.file) {
    throw new AppError('Please upload a photo or video file.');
  }

  const { title, description, category } = req.body;
  if (!title) throw new AppError('Title is required.');

  const folder = req.file.mimetype.startsWith('video/') ? 'videos' : 'images';
  const uploaded = await uploadToCloudinary(req.file, folder);

  const media = await Media.create({
    title,
    description: description || '',
    type: uploaded.type,
    category: (category || 'OTHER').toUpperCase(),
    cloudinaryUrl: uploaded.url,
    cloudinaryPublicId: uploaded.publicId,
    thumbnailUrl: uploaded.thumbnailUrl,
    isFeatured: req.body.isFeatured === 'true',
    isPublished: req.body.isPublished !== 'false',
  });

  res.status(201).json(media);
};

export const updateMedia = async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) throw new AppError('Media not found.', 404);

  const { title, description, category, isFeatured, isPublished } = req.body;

  if (title !== undefined) media.title = title;
  if (description !== undefined) media.description = description;
  if (category !== undefined) media.category = category.toUpperCase();
  if (isFeatured !== undefined) media.isFeatured = isFeatured === true || isFeatured === 'true';
  if (isPublished !== undefined) media.isPublished = isPublished === true || isPublished === 'true';

  await media.save();
  res.json(media);
};

export const deleteMedia = async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) throw new AppError('Media not found.', 404);

  await deleteFromCloudinary(media.cloudinaryPublicId, getResourceType(media.cloudinaryPublicId, media.type));
  await media.deleteOne();

  res.json({ message: 'Media deleted successfully.' });
};

export const getDashboardStats = async (req, res) => {
  const [photoCount, videoCount, activeOffers, upcomingEvents] = await Promise.all([
    Media.countDocuments({ type: 'IMAGE' }),
    Media.countDocuments({ type: 'VIDEO' }),
    (await import('../models/Offer.js')).default.countDocuments({
      isActive: true,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    }),
    (await import('../models/Event.js')).default.countDocuments({
      isPublished: true,
      eventDate: { $gte: new Date() },
    }),
  ]);

  res.json({ photoCount, videoCount, activeOffers, upcomingEvents });
};
