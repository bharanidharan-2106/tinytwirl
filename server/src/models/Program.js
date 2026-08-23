import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    ageRange: { type: String, required: true },
    stage: { type: String, required: true },
    shortObjective: { type: String, required: true },
    description: { type: String, required: true },
    objectives: [{ type: String }],
    fees: {
      threeMonths: { type: Number, default: null },
      sixMonths: { type: Number, default: null },
      twelveMonths: { type: Number, default: null },
      sibling: { type: Number, default: null },
    },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Program', programSchema);
