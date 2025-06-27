import express from "express";
import userActions from "../controllers/AuthController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRouter = express.Router();

authRouter.post("/register", userActions.register);
authRouter.post("/login", userActions.login);

authRouter.get(
  "/refresh",
  AuthMiddleware.verifyAccessToken,
  AuthMiddleware.verifyRefreshToken,
  userActions.refresh,
);

authRouter.post(
  "/logout",
  AuthMiddleware.verifyAccessToken,
  userActions.logout,
);

authRouter.put(
  "/update",
  AuthMiddleware.verifyAccessToken,
  upload.single("profilePic"),
  userActions.update,
);

authRouter.get(
  "/profile",
  AuthMiddleware.verifyAccessToken,
  userActions.profile,
);

authRouter.post(
  "/delete",
  AuthMiddleware.verifyAccessToken,
  userActions.delete,
);

authRouter.get(
  "/get/users/:userId/image",
  AuthMiddleware.verifyAccessToken,
  userActions.getUserPic,
);

authRouter.get(
  "/get/my/image",
  AuthMiddleware.verifyAccessToken,
  userActions.getMyPic,
);

export default authRouter;
