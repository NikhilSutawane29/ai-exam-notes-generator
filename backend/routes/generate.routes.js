import express from "express";
import { generateNotes } from "../controllers/generate.controller.js";
import isAuth from "../middleware/isAuth.js";
import {
  getMyNotes,
  getSingleNotes,
  deleteNotes,
} from "../controllers/notes.controller.js";

const notesRouter = express.Router();

notesRouter.post("/generate-notes", isAuth, generateNotes);
notesRouter.get("/getNotes", isAuth, getMyNotes);
notesRouter.get("/:id", isAuth, getSingleNotes);
notesRouter.delete("/:id", isAuth, deleteNotes);

export default notesRouter;
