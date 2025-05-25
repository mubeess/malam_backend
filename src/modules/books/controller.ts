// @ts-nocheck
import { Request, Response } from 'express';
import { eq, desc, like, sql } from 'drizzle-orm';
import { books } from '../../db/schemas/bookSchema';
import { db } from '../../db/schemas';

// Get all books with pagination and filters
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, language, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = db.select().from(books);

    // Apply filters
    if (category) {
      query = query.where(eq(books.category, category as string));
    }
    if (language) {
      query = query.where(eq(books.language, language as string));
    }

    if (search) {
      query = query.where(like(books.title, `%${search as string}%`));
    }

    // Add pagination
    const results = await query.limit(Number(limit)).offset(offset).orderBy(desc(books.createdAt));

    // Get total count for pagination
    const totalCount = await db.select({ count: sql<number>`count(*)` }).from(books);

    return res.status(200).json({
      books: results,
      pagination: {
        total: totalCount[0].count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount[0].count / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({ message: 'Server error while fetching books' });
  }
};

// Get book by ID with its chapters
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, Number(id)));
    if (book.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get chapters if book has chapters

    return res.status(200).json({
      book: book[0],
    });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    return res.status(500).json({ message: 'Server error while fetching book' });
  }
};

// Create a new book (Admin only)
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, coverImage, category, language, publishYear } = req.body;

    // Create book
    const newBook = await db
      .insert(books)
      .values({
        title,
        author,
        description,
        coverImage,
        category,
        language,
        publishYear: publishYear || null,
      })
      .returning();

    return res.status(201).json({ message: 'Book created successfully', book: newBook[0] });
  } catch (error) {
    console.error('Error creating book:', error);
    return res.status(500).json({ message: 'Server error while creating book' });
  }
};

// Update book (Admin only)
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      description,
      coverImage,
      category,
      language,

      publishYear,
    } = req.body;

    // Check if book exists
    const existingBook = await db
      .select()
      .from(books)
      .where(eq(books.id, Number(id)));
    if (existingBook.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update book
    const updatedBook = await db
      .update(books)
      .set({
        title: title || existingBook[0].title,
        author: author ?? existingBook[0].author,
        description: description ?? existingBook[0].description,
        coverImage: coverImage ?? existingBook[0].coverImage,
        category: category ?? existingBook[0].category,
        language: language ?? existingBook[0].language,
        publishYear: publishYear ?? existingBook[0].publishYear,
        updatedAt: new Date(),
      })
      .where(eq(books.id, Number(id)))
      .returning();

    return res.status(200).json({ message: 'Book updated successfully', book: updatedBook[0] });
  } catch (error) {
    console.error('Error updating book:', error);
    return res.status(500).json({ message: 'Server error while updating book' });
  }
};

// Delete book (Admin only)
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if book exists
    const existingBook = await db
      .select()
      .from(books)
      .where(eq(books.id, Number(id)));
    if (existingBook.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Delete the book
    await db.delete(books).where(eq(books.id, Number(id)));

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ message: 'Server error while deleting book' });
  }
};
