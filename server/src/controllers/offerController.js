import Offer from '../models/Offer.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';
import { AppError } from '../middleware/errorHandler.js';

const activeOfferFilter = {
  isActive: true,
  startDate: { $lte: new Date() },
  endDate: { $gte: new Date() },
};

export const getPublicOffers = async (req, res) => {
  const offers = await Offer.find(activeOfferFilter).sort({ startDate: -1 });
  res.json(offers);
};

export const getAdminOffers = async (req, res) => {
  const offers = await Offer.find().sort({ startDate: -1 });
  res.json(offers);
};

export const createOffer = async (req, res) => {
  const { title, description, startDate, endDate, isActive } = req.body;
  if (!title || !description || !startDate || !endDate) {
    throw new AppError('Title, description, start date and end date are required.');
  }

  let imageUrl = '';
  let cloudinaryPublicId = '';

  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file, 'offers');
    imageUrl = uploaded.url;
    cloudinaryPublicId = uploaded.publicId;
  }

  const offer = await Offer.create({
    title,
    description,
    startDate,
    endDate,
    imageUrl,
    cloudinaryPublicId,
    isActive: isActive !== 'false' && isActive !== false,
  });

  res.status(201).json(offer);
};

export const updateOffer = async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) throw new AppError('Offer not found.', 404);

  const { title, description, startDate, endDate, isActive } = req.body;

  if (title !== undefined) offer.title = title;
  if (description !== undefined) offer.description = description;
  if (startDate !== undefined) offer.startDate = startDate;
  if (endDate !== undefined) offer.endDate = endDate;
  if (isActive !== undefined) offer.isActive = isActive === true || isActive === 'true';

  if (req.file) {
    if (offer.cloudinaryPublicId) {
      await deleteFromCloudinary(offer.cloudinaryPublicId, 'image');
    }
    const uploaded = await uploadToCloudinary(req.file, 'offers');
    offer.imageUrl = uploaded.url;
    offer.cloudinaryPublicId = uploaded.publicId;
  }

  await offer.save();
  res.json(offer);
};

export const deleteOffer = async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) throw new AppError('Offer not found.', 404);

  if (offer.cloudinaryPublicId) {
    await deleteFromCloudinary(offer.cloudinaryPublicId, 'image');
  }

  await offer.deleteOne();
  res.json({ message: 'Offer deleted successfully.' });
};
