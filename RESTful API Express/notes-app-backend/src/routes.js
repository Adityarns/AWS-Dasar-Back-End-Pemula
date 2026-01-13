import express from "express";
import {
  createNote,
  deleteNoteById,
  editNoteByID,
  getNote,
  getNotebyID,
} from "./controller.js";

const router = express.Router();
router.post("/notes", createNote);
router.get("/notes", getNote);
router.get("/notes/:id", getNotebyID);
router.put("/notes/:id", editNoteByID);
router.delete("/notes/:id", deleteNoteById);

export default router;
