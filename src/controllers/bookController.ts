import { author } from "../models/Author";
import book from "../models/Book";
import { Request, Response } from "express";

class BookController {
  static async listBooks(req: Request, res: Response) {
    try {
      const books = await book.find({});
      res.status(200).json(books);
    } catch (err: any) {
      res.status(500).json({ message: `Failed to list books: ${err.message}` });
    }
  }

  static async listBookById(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      const bookJson = await book.findById(bookId);
      res.status(200).json(bookJson);
    } catch (err: any) {
      res.status(500).json({ message: `Failed to find book: ${err.message}` });
    }
  }

  static async addBook(req: Request, res: Response) {
    const newBook = req.body;
    try {
      const foundAuthor = await author.findById(newBook.author);
      const formattedBook = { ...newBook, author: { ...foundAuthor } };
      const createdBook = await book.create(formattedBook);
      res
        .status(201)
        .json({ message: "Book added successfully", book: createdBook });
    } catch (err: any) {
      res.status(500).json({ message: `Failed to add book: ${err.message}` });
    }
  }

  static async updateBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      await book.findByIdAndUpdate(bookId, req.body);
      res.status(200).json({ message: "Book updated successfully" });
    } catch (err: any) {
      res
        .status(500)
        .json({ message: `Failed to update book: ${err.message}` });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      await book.findByIdAndDelete(bookId);
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (err: any) {
      res
        .status(500)
        .json({ message: `Failed to delete book: ${err.message}` });
    }
  }

  static async listBooksByPublisher(req: Request, res: Response) {
    const publisher = req.query.publisher;
    try {
      const booksByPublisher = await book.find({ publisher: publisher });
      res.status(200).json(booksByPublisher);
    } catch (err: any) {
      res.status(500).json({ message: `Failed to find books: ${err.message}` });
    }
  }
}

export default BookController;
