import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      enum: {
        values: ["Hachette", "Macmillan", "HarperCollins"],
        message: "The publisher {VALUE} is not allowed",
      },
    },
    price: { type: Number },
    pages: {
      type: Number,
      validate: {
        validator: (value: number) => {
          return value >= 10 && value <= 5000;
        },
        message: "Pages has to be between 10 and 5000",
      },
    },
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
