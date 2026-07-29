import express from "express";
import isAuth from "../middleware/isAuth.js";
import { pptDownload } from "../controllers/ppt.controller.js";

const pptRouter = express.Router();

// Generate and download PowerPoint
pptRouter.post("/generate-ppt", isAuth, pptDownload);

export default pptRouter;