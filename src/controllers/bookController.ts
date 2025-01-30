import { author } from "../models/Author";
import book from "../models/Book";
import { Request, Response } from "express";
import { handleErrors } from "../middleware/errorHandler";

class BookController {
  static listBooks = handleErrors(async (req: Request, res: Response) => {
    const books = await book.find({});
    res.status(200).json(books);
  });

  static listBookById = handleErrors(async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const bookJson = await book.findById(bookId);
    res.status(200).json(bookJson);
  });

  static addBook = handleErrors(async (req: Request, res: Response) => {
    const newBook = req.body;
    const foundAuthor = await author.findById(newBook.author);
    const formattedBook = { ...newBook, author: { ...foundAuthor } };
    const createdBook = await book.create(formattedBook);
    res
      .status(201)
      .json({ message: "Book added successfully", book: createdBook });
  });

  static updateBook = handleErrors(async (req: Request, res: Response) => {
    const bookId = req.params.id;
    await book.findByIdAndUpdate(bookId, req.body);
    res.status(200).json({ message: "Book updated successfully" });
  });

  static deleteBook = handleErrors(async (req: Request, res: Response) => {
    const bookId = req.params.id;
    await book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  });

  static listBooksByPublisher = handleErrors(
    async (req: Request, res: Response) => {
      const publisher = req.query.publisher;
      const booksByPublisher = await book.find({ publisher: publisher });
      res.status(200).json(booksByPublisher);
    }
  );
}

export default BookController;
