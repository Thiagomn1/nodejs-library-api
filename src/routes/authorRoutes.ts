import express from "express";
import AuthorController from "../controllers/authorController";
import paginate from "../middleware/pagination";

const routes = express.Router();

routes.get("/authors", AuthorController.listAuthors, paginate);
routes.get("/authors/:id", AuthorController.listAuthorById);
routes.post("/authors", AuthorController.addAuthor);
routes.put("/authors/:id", AuthorController.updateAuthor);
routes.delete("/authors/:id", AuthorController.deleteAuthor);

export default routes;
