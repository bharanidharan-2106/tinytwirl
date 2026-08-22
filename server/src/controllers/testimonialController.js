import Testimonial from '../models/Testimonial.js';
import { AppError } from '../middleware/errorHandler.js';

export const getPublicTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
  res.json(testimonials);
};

export const getAdminTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
};

export const createTestimonial = async (req, res) => {
  const { parentName, childProgram, content, rating, isPublished, isFeatured } = req.body;

  if (!parentName || !content) {
    throw new AppError('Parent name and testimonial content are required.');
  }

  const testimonial = await Testimonial.create({
    parentName,
    childProgram: childProgram || '',
    content,
    rating: rating || 5,
    isPublished: isPublished !== 'false' && isPublished !== false,
    isFeatured: isFeatured === true || isFeatured === 'true',
  });

  res.status(201).json(testimonial);
};

export const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) throw new AppError('Testimonial not found.', 404);
  res.json(testimonial);
};

export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new AppError('Testimonial not found.', 404);
  await testimonial.deleteOne();
  res.json({ message: 'Testimonial deleted successfully.' });
};
