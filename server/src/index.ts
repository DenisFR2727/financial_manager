import './config/env.js';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ensureDefaultCategories } from './services/ensureDefaultCategories.js';
import {
  analyticsRoutes,
  categoryRoutes,
  expenseRoutes,
} from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

async function start() {
  await connectDB();
  await ensureDefaultCategories();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
