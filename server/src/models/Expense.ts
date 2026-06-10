import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const expenseSchema = new Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

expenseSchema.index({ date: -1 });
expenseSchema.index({ categoryId: 1 });

export type ExpenseDocument = InferSchemaType<typeof expenseSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Expense = mongoose.model('Expense', expenseSchema);
