import "dotenv/config";
import express from "express";
import connectDB from "./config/dbConnect";
import book from "./models/Book";

const app = express();
app.use(express.json());

const PORT = 3000;

const books = [
  { id: 1, title: "Lord of the Rings" },
  { id: 2, title: "Hunger Games" },
];

const searchBook = (id: string) => {
  return books.findIndex((book) => book.id === Number(id));
};

app.get("/", (req, res) => {
  res.status(200).send("Node.js Library");
});

app.get("/books", async (req, res) => {
  const books = await book.find({});
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const index = searchBook(bookId);

  res.status(200).json(books[index]);
});

app.post("/books", (req, res) => {
  books.push(req.body);

  res.status(201).send("Book added successfully");
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const index = searchBook(bookId);

  books[index].title = req.body.title;

  res.status(200).json(books);
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const index = searchBook(bookId);

  books.splice(index, 1);

  res.status(200).send("Book deleted successfully");
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

startServer();
