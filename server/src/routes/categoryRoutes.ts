import { Router } from 'express';
import { Category } from '../models/Category.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const categoryRoutes = Router();

categoryRoutes.get(
  '/',
  asyncHandler(async (_req, res) => {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  }),
);
