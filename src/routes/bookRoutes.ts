import express from "express";
import BookController from "../controllers/bookController";
import paginate from "../middleware/pagination";

const routes = express.Router();

routes.get("/books", BookController.listBooks, paginate);
routes.get("/books/search", BookController.listBooksByFilter, paginate);
routes.get("/books/:id", BookController.listBookById);
routes.post("/books", BookController.addBook);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;
