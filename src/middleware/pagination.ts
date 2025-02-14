import { NextFunction, Response, Request } from "express";
import { SortOrder } from "mongoose";
import ValidationError from "../errors/ValidationError";

export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any; // or a more specific type based on the structure of your `result`
}

const paginate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const page = Number(req.query.page) || 1;
    const sortField = (req.query.orderField as string) || "_id";
    const sort: SortOrder = (
      Number(req.query.order) === -1 ? -1 : 1
    ) as SortOrder;

    const result = req.result;

    if (limit > 0 && page > 0) {
      const paginatedResult = await result
        .find()
        .sort({ [sortField]: sort })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author")
        .exec();

      res.status(200).json(paginatedResult);
    } else {
      next(new ValidationError());
    }
  } catch (err: unknown) {
    next(err);
  }
};

export default paginate;
