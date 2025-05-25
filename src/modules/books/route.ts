// @ts-nocheck
import { Router } from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './controller';

const router = Router();

router.post('/add', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
