import express from "express";
import userActions from "../controllers/AuthController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", userActions.register);
authRouter.post("/login", userActions.login);

authRouter.get(
  "/refresh",
  AuthMiddleware.verifyAccessToken,
  AuthMiddleware.verifyRefreshToken,
  userActions.refresh,
);

export default authRouter;
