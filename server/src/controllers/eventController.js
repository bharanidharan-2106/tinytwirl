import Event from '../models/Event.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';
import { AppError } from '../middleware/errorHandler.js';

export const getPublicEvents = async (req, res) => {
  const events = await Event.find({ isPublished: true }).sort({ eventDate: 1 });
  res.json(events);
};

export const getAdminEvents = async (req, res) => {
  const events = await Event.find().sort({ eventDate: 1 });
  res.json(events);
};

export const createEvent = async (req, res) => {
  const { title, description, eventDate, endDate, location, isPublished } = req.body;
  if (!title || !description || !eventDate) {
    throw new AppError('Title, description and event date are required.');
  }

  let imageUrl = '';
  let cloudinaryPublicId = '';

  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file, 'images');
    imageUrl = uploaded.url;
    cloudinaryPublicId = uploaded.publicId;
  }

  const event = await Event.create({
    title,
    description,
    eventDate,
    endDate: endDate || null,
    location: location || '',
    imageUrl,
    cloudinaryPublicId,
    isPublished: isPublished !== 'false' && isPublished !== false,
  });

  res.status(201).json(event);
};

export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new AppError('Event not found.', 404);

  const fields = ['title', 'description', 'eventDate', 'endDate', 'location', 'isPublished'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      if (field === 'isPublished') {
        event.isPublished = req.body.isPublished === true || req.body.isPublished === 'true';
      } else {
        event[field] = req.body[field];
      }
    }
  });

  if (req.file) {
    if (event.cloudinaryPublicId) {
      await deleteFromCloudinary(event.cloudinaryPublicId, 'image');
    }
    const uploaded = await uploadToCloudinary(req.file, 'images');
    event.imageUrl = uploaded.url;
    event.cloudinaryPublicId = uploaded.publicId;
  }

  await event.save();
  res.json(event);
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new AppError('Event not found.', 404);

  if (event.cloudinaryPublicId) {
    await deleteFromCloudinary(event.cloudinaryPublicId, 'image');
  }

  await event.deleteOne();
  res.json({ message: 'Event deleted successfully.' });
};
