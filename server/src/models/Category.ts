import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    icon: { type: String },
  },
  { timestamps: true },
);

export type CategoryDocument = InferSchemaType<typeof categorySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Category = mongoose.model('Category', categorySchema);
