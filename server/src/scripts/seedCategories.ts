import '../config/env.js';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { defaultCategories } from '../data/defaultCategories.js';
import { Category } from '../models/Category.js';

async function seed() {
  await connectDB();

  for (const category of defaultCategories) {
    await Category.findOneAndUpdate({ name: category.name }, category, {
      upsert: true,
      new: true,
    });
  }

  console.log(`Seeded ${defaultCategories.length} categories`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
