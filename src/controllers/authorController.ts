import { author } from "../models/Author";
import { Request, Response } from "express";

class AuthorController {
  static async listAuthors(req: Request, res: Response) {
    try {
      const authors = await author.find({});
      res.status(200).json(authors);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: `Failed to list authors: ${err.message}` });
    }
  }

  static async listAuthorById(req: Request, res: Response) {
    try {
      const authorId = req.params.id;
      const authorJson = await author.findById(authorId);
      res.status(200).json(authorJson);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: `Failed to find author: ${err.message}` });
    }
  }

  static async addAuthor(req: Request, res: Response) {
    try {
      const newAuthor = await author.create(req.body);
      res
        .status(201)
        .json({ message: "Author added successfully", author: newAuthor });
    } catch (err: any) {
      res.status(500).json({ message: `Failed to add author: ${err.message}` });
    }
  }

  static async updateAuthor(req: Request, res: Response) {
    try {
      const authorId = req.params.id;
      await author.findByIdAndUpdate(authorId, req.body);
      res.status(200).json({ message: "Author updated successfully" });
    } catch (err: any) {
      res
        .status(500)
        .json({ message: `Failed to update author: ${err.message}` });
    }
  }

  static async deleteAuthor(req: Request, res: Response) {
    try {
      const authorId = req.params.id;
      await author.findByIdAndDelete(authorId);
      res.status(200).json({ message: "Author deleted successfully" });
    } catch (err: any) {
      res
        .status(500)
        .json({ message: `Failed to delete author: ${err.message}` });
    }
  }
}

export default AuthorController;
