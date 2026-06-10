import { Category } from '../models/Category.js';
import { defaultCategories } from '../data/defaultCategories.js';

export async function ensureDefaultCategories(): Promise<void> {
  const count = await Category.countDocuments();

  if (count > 0) {
    return;
  }

  for (const category of defaultCategories) {
    await Category.findOneAndUpdate({ name: category.name }, category, {
      upsert: true,
      new: true,
    });
  }

  console.log(`Seeded ${defaultCategories.length} default categories`);
}
