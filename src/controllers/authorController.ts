import NotFoundError from "../errors/NotFoundError";
import { author } from "../models";
import { NextFunction, Request, Response } from "express";

class AuthorController {
  static listAuthors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authors = await author.find({});
      res.status(200).json(authors);
    } catch (err: unknown) {
      next(err);
    }
  };

  static listAuthorById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorId = req.params.id;
      const authorJson = await author.findById(authorId);

      if (authorJson !== null) {
        res.status(200).json(authorJson);
      } else {
        next(new NotFoundError("Author with specified ID not found"));
      }
    } catch (err: unknown) {
      next(err);
    }
  };

  static addAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newAuthor = await author.create(req.body);
      res
        .status(201)
        .json({ message: "Author added successfully", author: newAuthor });
    } catch (err: unknown) {
      next(err);
    }
  };

  static updateAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorId = req.params.id;
      const authorUpdated = await author.findByIdAndUpdate(authorId, {
        $set: req.body,
      });

      if (authorUpdated !== null) {
        res.status(200).json({ message: "Author updated successfully" });
      } else {
        next(new NotFoundError("Author with specified ID not found"));
      }
    } catch (err: unknown) {
      next(err);
    }
  };

  static deleteAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorId = req.params.id;
      const deletedAuthor = await author.findByIdAndDelete(authorId);

      if (deletedAuthor !== null) {
        res.status(200).json({ message: "Author deleted successfully" });
      } else {
        next(new NotFoundError("Author with specified ID not found"));
      }
    } catch (err: unknown) {
      next(err);
    }
  };
}

export default AuthorController;
