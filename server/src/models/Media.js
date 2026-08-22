import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['IMAGE', 'VIDEO'], required: true },
    category: {
      type: String,
      enum: ['CLASSES', 'EVENTS', 'PERFORMANCES', 'KIDS', 'CENTRE', 'OTHER'],
      default: 'OTHER',
    },
    cloudinaryUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
