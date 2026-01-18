import express from "express";
import {
  createBook,
  editBookById,
  getBook,
  getBookById,
} from "./controller.js";

const router = express.Router();
router.post("/books", createBook);
router.get("/books", getBook);
router.get("/books/:id", getBookById);
router.put("/books/:id", editBookById);

export default router;
