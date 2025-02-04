import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: { type: String, required: [true, "Title is required"] },
    publisher: { type: String, required: [true, "Publisher is required"] },
    price: { type: Number },
    pages: { type: Number },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: [true, "Author is required"],
    },
  },
  { versionKey: false }
);

const book = mongoose.model("books", bookSchema);

export default book;
