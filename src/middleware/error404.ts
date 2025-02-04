import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/NotFoundError";

const error404 = (req: Request, res: Response, next: NextFunction) => {
  const error404 = new NotFoundError();
  next(error404);
};

export default error404;
