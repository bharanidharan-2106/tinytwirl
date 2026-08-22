import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true, trim: true },
    childProgram: { type: String, default: '' },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
