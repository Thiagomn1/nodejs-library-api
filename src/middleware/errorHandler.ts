import { Request, Response } from "express";
import mongoose from "mongoose";

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  } else if (typeof err === "string") {
    return err;
  } else if (typeof err === "object" && err !== null) {
    return JSON.stringify(err);
  }
  return "An unknown error occurred";
};

export const handleErrors =
  (
    fn: (req: Request, res: Response) => Promise<void>
  ): ((req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (err: unknown) {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "One or more fields are incorrect" });
        return;
      }
      res
        .status(500)
        .json({ message: `An error occurred: ${getErrorMessage(err)}` });
      return;
    }
  };
