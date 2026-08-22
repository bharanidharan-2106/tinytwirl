import Program from '../models/Program.js';
import { AppError } from '../middleware/errorHandler.js';

export const getPublicPrograms = async (req, res) => {
  const programs = await Program.find({ isPublished: true }).sort({ order: 1 });
  res.json(programs);
};

export const getAdminPrograms = async (req, res) => {
  const programs = await Program.find().sort({ order: 1 });
  res.json(programs);
};

export const createProgram = async (req, res) => {
  const program = await Program.create(req.body);
  res.status(201).json(program);
};

export const updateProgram = async (req, res) => {
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
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
