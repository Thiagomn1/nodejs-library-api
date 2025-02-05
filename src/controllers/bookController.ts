import NotFoundError from "../errors/NotFoundError";
import { author, book } from "../models";
import { NextFunction, Request, Response } from "express";

class BookController {
  static listBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const books = await book.find({});
      res.status(200).json(books);
    } catch (err: unknown) {
      next(err);
    }
  };

  static listBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookId = req.params.id;
      const bookJson = await book.findById(bookId);

      if (bookJson !== null) {
        res.status(200).send(bookJson);
      } else {
        next(new NotFoundError("Book with specified ID not found."));
      }
    } catch (err: unknown) {
      next(err);
    }
  };

  static addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBook = req.body;
      const foundAuthor = await author.findById(newBook.author);
      const formattedBook = { ...newBook, author: { ...foundAuthor } };
      const createdBook = await book.create(formattedBook);
      res
        .status(201)
        .json({ message: "Book added successfully", book: createdBook });
    } catch (err: unknown) {
      next(err);
    }
  };

  static updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookId = req.params.id;
      const bookUpdated = await book.findByIdAndUpdate(bookId, {
        $set: req.body,
      });

      if (bookUpdated !== null) {
        res.status(200).json({ message: "Book updated successfully" });
      } else {
        next(new NotFoundError("Book with specified ID not found."));
      }
    } catch (err: unknown) {
      next(err);
    }
  };

  static deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await book.findByIdAndDelete(bookId);

      if (deletedBook !== null) {
        res.status(200).json({ message: "Book deleted successfully" });
      } else {
        next(new NotFoundError("Book with specified ID not found."));
      }
    } catch (err: unknown) {
      next(err);
    }
  };

  static listBooksByPublisher = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const publisher = req.query.publisher;
      const booksByPublisher = await book.find({ publisher: publisher });
      res.status(200).json(booksByPublisher);
    } catch (err: unknown) {
      next(err);
    }
  };
}

export default BookController;
