import express from "express";

const app = express();
app.use(express.json());

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

app.get("/books", (req, res) => {
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

export default app;
