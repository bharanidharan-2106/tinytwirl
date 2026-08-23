import Program from '../models/Program.js';
import { AppError } from '../middleware/errorHandler.js';

const FEE_KEYS = ['threeMonths', 'sixMonths', 'twelveMonths', 'sibling'];

const sanitizeFees = (fees) => {
  if (!fees || typeof fees !== 'object') return undefined;
  const next = {};
  FEE_KEYS.forEach((key) => {
    const value = fees[key];
    if (value === '' || value === undefined || value === null) {
      next[key] = null;
    } else {
      const amount = Number(value);
      next[key] = Number.isFinite(amount) ? amount : null;
    }
  });
  return next;
};

export const getPublicPrograms = async (req, res) => {
  const programs = await Program.find({ isPublished: true }).sort({ order: 1 });
  res.json(programs);
};

export const getAdminPrograms = async (req, res) => {
  const programs = await Program.find().sort({ order: 1 });
  res.json(programs);
};

export const createProgram = async (req, res) => {
  const payload = { ...req.body, fees: sanitizeFees(req.body.fees) };
  const program = await Program.create(payload);
  res.status(201).json(program);
};

export const updateProgram = async (req, res) => {
  const payload = { ...req.body };
  if (req.body.fees !== undefined) {
    payload.fees = sanitizeFees(req.body.fees);
  }
  const program = await Program.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!program) throw new AppError('Program not found.', 404);
  res.json(program);
};

export const deleteProgram = async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) throw new AppError('Program not found.', 404);
  await program.deleteOne();
  res.json({ message: 'Program deleted successfully.' });
};
