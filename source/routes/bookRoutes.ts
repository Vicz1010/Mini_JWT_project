import express from 'express';
import { createBook, getAllBooks } from '../controllers/bookController';

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.post('/create', createBook);

export default bookRouter;
