import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/HttpError.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof Error && err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof Error && err.name === 'CastError') {
    res.status(400).json({ error: 'Invalid ID format' });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
}
