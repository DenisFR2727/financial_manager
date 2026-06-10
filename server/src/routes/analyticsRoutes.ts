import { Router } from 'express';
import { Expense } from '../models/Expense.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getCurrentMonth, getMonthRange } from '../utils/date.js';
import { HttpError } from '../utils/HttpError.js';
import { monthQuerySchema } from '../validation/expense.js';

export const analyticsRoutes = Router();

function parseMonth(month: unknown): string {
  const value = (month as string) || getCurrentMonth();
  const parsed = monthQuerySchema.safeParse(value);
  if (!parsed.success) {
    throw new HttpError('Invalid month format', 400);
  }
  return parsed.data;
}

analyticsRoutes.get(
  '/by-category',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const { start, end } = getMonthRange(month);

    const data = await Expense.aggregate([
      { $match: { date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: '$categoryId',
          total: { $sum: '$amount' },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: 0,
          categoryId: '$_id',
          name: '$category.name',
          color: '$category.color',
          value: '$total',
        },
      },
      { $sort: { value: -1 } },
    ]);

    res.json(data);
  }),
);

analyticsRoutes.get(
  '/monthly-total',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const { start, end } = getMonthRange(month);

    const result = await Expense.aggregate([
      { $match: { date: { $gte: start, $lte: end } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({ total: result[0]?.total ?? 0 });
  }),
);
