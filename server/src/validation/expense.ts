import { z } from 'zod';

export const monthQuerySchema = z
  .string()
  .regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format');

export const expenseBodySchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  categoryId: z.string().min(1, 'Category is required'),
  date: z
    .string()
    .datetime()
    .or(z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'Invalid date format')),
  description: z.string().optional(),
});

export const expenseUpdateSchema = expenseBodySchema.partial();
