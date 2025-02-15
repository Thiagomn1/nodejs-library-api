import NotFoundError from "../errors/NotFoundError";
import { CustomRequest } from "../middleware/pagination";
import { author, book } from "../models";
import { NextFunction, Request, Response } from "express";

interface ISearchFilter {
  title?: string | RegExp;
  publisher?: string;
  pages?: {
    $gte?: number;
    $lte?: number;
  };
  author?: string;
}

class BookController {
  static listBooks = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const searchBooks = book.find();

      req.result = searchBooks;

      next();
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
      const bookJson = await book
        .findById(bookId)
        .populate("author", "name")
        .exec();

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

  static listBooksByFilter = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const search = await processSearch(
        req.query as Record<string, string | undefined>
      );

      if (search) {
        const booksByPublisher = book.find(search).populate("author").exec();

        req.result = booksByPublisher;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (err: unknown) {
      next(err);
    }
  };
}

async function processSearch(params: {
  publisher?: string;
  title?: string;
  minPages?: string;
  maxPages?: string;
  authorName?: string;
}) {
  const publisher = params.publisher as string;
  const title = params.title as string;
  const minPages = params.minPages as string;
  const maxPages = params.maxPages as string;
  const authorName = params.authorName as string;

  let search: ISearchFilter | null = {};

  const regex = new RegExp(title, "i");

  if (publisher) search.publisher = publisher;
  if (title) search.title = regex;

  if (minPages || maxPages) {
    search.pages = {};
    if (minPages) search.pages.$gte = parseInt(minPages);
    if (maxPages) search.pages.$lte = parseInt(maxPages);
  }

  const foundAuthor = await author.findOne({ name: authorName });

  if (foundAuthor) {
    search.author = foundAuthor._id.toString();
  } else {
    search = null;
  }

  return search;
}

export default BookController;
