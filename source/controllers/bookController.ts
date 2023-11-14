import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Book from '../models/Book';

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Book.find()
    .then((results) => {
      return res.status(200).json({
        books: results,
        count: results.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { author, title } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
  });

  return await book
    .save()
    .then((result) => {
      return res.status(201).json({ book: result });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};
