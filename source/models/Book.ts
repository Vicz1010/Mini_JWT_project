import mongoose, { Schema } from 'mongoose';
import IBook from '../interfaces/Book';

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    extraInformation: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBook>('Book', bookSchema);
