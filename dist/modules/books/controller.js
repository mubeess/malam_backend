"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const bookSchema_1 = require("../../db/schemas/bookSchema");
const schemas_1 = require("../../db/schemas");
// Get all books with pagination and filters
const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, language, search } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let query = schemas_1.db.select().from(bookSchema_1.books);
        // Apply filters
        if (category) {
            query = query.where((0, drizzle_orm_1.eq)(bookSchema_1.books.category, category));
        }
        if (language) {
            query = query.where((0, drizzle_orm_1.eq)(bookSchema_1.books.language, language));
        }
        if (search) {
            query = query.where((0, drizzle_orm_1.like)(bookSchema_1.books.title, `%${search}%`));
        }
        // Add pagination
        const results = await query.limit(Number(limit)).offset(offset).orderBy((0, drizzle_orm_1.desc)(bookSchema_1.books.createdAt));
        // Get total count for pagination
        const totalCount = await schemas_1.db.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(bookSchema_1.books);
        return res.status(200).json({
            books: results,
            pagination: {
                total: totalCount[0].count,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(totalCount[0].count / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({ message: 'Server error while fetching books' });
    }
};
exports.getAllBooks = getAllBooks;
// Get book by ID with its chapters
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await schemas_1.db
            .select()
            .from(bookSchema_1.books)
            .where((0, drizzle_orm_1.eq)(bookSchema_1.books.id, Number(id)));
        if (book.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // Get chapters if book has chapters
        return res.status(200).json({
            book: book[0],
        });
    }
    catch (error) {
        console.error('Error fetching book by ID:', error);
        return res.status(500).json({ message: 'Server error while fetching book' });
    }
};
exports.getBookById = getBookById;
// Create a new book (Admin only)
const createBook = async (req, res) => {
    try {
        const { title, author, description, coverImage, category, language, publishYear } = req.body;
        // Create book
        const newBook = await schemas_1.db
            .insert(bookSchema_1.books)
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
    }
    catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ message: 'Server error while creating book' });
    }
};
exports.createBook = createBook;
// Update book (Admin only)
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, description, coverImage, category, language, publishYear, } = req.body;
        // Check if book exists
        const existingBook = await schemas_1.db
            .select()
            .from(bookSchema_1.books)
            .where((0, drizzle_orm_1.eq)(bookSchema_1.books.id, Number(id)));
        if (existingBook.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // Update book
        const updatedBook = await schemas_1.db
            .update(bookSchema_1.books)
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
            .where((0, drizzle_orm_1.eq)(bookSchema_1.books.id, Number(id)))
            .returning();
        return res.status(200).json({ message: 'Book updated successfully', book: updatedBook[0] });
    }
    catch (error) {
        console.error('Error updating book:', error);
        return res.status(500).json({ message: 'Server error while updating book' });
    }
};
exports.updateBook = updateBook;
// Delete book (Admin only)
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if book exists
        const existingBook = await schemas_1.db
            .select()
            .from(bookSchema_1.books)
            .where((0, drizzle_orm_1.eq)(bookSchema_1.books.id, Number(id)));
        if (existingBook.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // Delete the book
        await schemas_1.db.delete(bookSchema_1.books).where((0, drizzle_orm_1.eq)(bookSchema_1.books.id, Number(id)));
        return res.status(200).json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({ message: 'Server error while deleting book' });
    }
};
exports.deleteBook = deleteBook;
