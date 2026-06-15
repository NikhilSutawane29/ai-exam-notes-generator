import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  getCurrentUser,
  updateCredits,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/currentUser", isAuth, getCurrentUser);
userRouter.put("/updateCredits", isAuth, updateCredits);

export default userRouter;
