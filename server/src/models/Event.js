import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    cloudinaryPublicId: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
