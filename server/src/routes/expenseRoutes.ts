import { Router } from 'express';
import { Expense } from '../models/Expense.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getCurrentMonth, getMonthRange } from '../utils/date.js';
import { HttpError } from '../utils/HttpError.js';
import {
  expenseBodySchema,
  expenseUpdateSchema,
  monthQuerySchema,
} from '../validation/expense.js';

export const expenseRoutes = Router();

const categoryFields = 'name color icon';

function parseMonth(month: unknown): string {
  const value = (month as string) || getCurrentMonth();
  const parsed = monthQuerySchema.safeParse(value);
  if (!parsed.success) {
    throw new HttpError('Invalid month format', 400);
  }
  return parsed.data;
}

expenseRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const { start, end } = getMonthRange(month);

    const expenses = await Expense.find({
      date: { $gte: start, $lte: end },
    })
      .sort({ date: -1 })
      .populate('categoryId', categoryFields);

    res.json(expenses);
  }),
);

expenseRoutes.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = expenseBodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const expense = await Expense.create({
      ...parsed.data,
      date: new Date(parsed.data.date),
    });

    const populated = await expense.populate('categoryId', categoryFields);
    res.status(201).json(populated);
  }),
);

expenseRoutes.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = expenseUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const updateData: Record<string, unknown> = { ...parsed.data };
    if (parsed.data.date) {
      updateData.date = new Date(parsed.data.date);
    }

    const expense = await Expense.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate('categoryId', categoryFields);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }

    res.json(expense);
  }),
);

expenseRoutes.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }

    res.json({ message: 'Deleted' });
  }),
);
