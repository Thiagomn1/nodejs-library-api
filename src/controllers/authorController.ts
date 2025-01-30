import { author } from "../models/Author";
import { Request, Response } from "express";
import { handleErrors } from "../middleware/errorHandler";

class AuthorController {
  static listAuthors = handleErrors(async (req: Request, res: Response) => {
    const authors = await author.find({});
    res.status(200).json(authors);
  });

  static listAuthorById = handleErrors(async (req: Request, res: Response) => {
    const authorId = req.params.id;
    const authorJson = await author.findById(authorId);

    if (authorJson !== null) {
      res.status(200).json(authorJson);
    } else {
      res
        .status(400)
        .json({ message: `Failed to find author with specified ID` });
    }
  });

  static addAuthor = handleErrors(async (req: Request, res: Response) => {
    const newAuthor = await author.create(req.body);
    res
      .status(201)
      .json({ message: "Author added successfully", author: newAuthor });
  });

  static updateAuthor = handleErrors(async (req: Request, res: Response) => {
    const authorId = req.params.id;
    await author.findByIdAndUpdate(authorId, req.body);
    res.status(200).json({ message: "Author updated successfully" });
  });

  static deleteAuthor = handleErrors(async (req: Request, res: Response) => {
    const authorId = req.params.id;
    await author.findByIdAndDelete(authorId);
    res.status(200).json({ message: "Author deleted successfully" });
  });
}

export default AuthorController;
