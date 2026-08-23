import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    registrationFee: { type: Number, default: 2000 },
    registrationFeeEnabled: { type: Boolean, default: true },
    autismPackageFee: { type: Number, default: 800 },
    autismPackageFeeEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
