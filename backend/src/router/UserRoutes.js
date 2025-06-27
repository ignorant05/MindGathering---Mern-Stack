import express from "express";
import commentActions from "../controllers/CommentController.js";
import blogActions from "../controllers/BlogController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const userRouter = express.Router();

// blogs
userRouter.get(
  "/pages",
  AuthMiddleware.verifyAccessToken,
  blogActions.pagination,
);

userRouter.get(
  "/get/all/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.getAllBlogs,
);

userRouter.get(
  "/count/all/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.countAllBlogs,
);

userRouter.get(
  "/get/my/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.getMyBlogs,
);

userRouter.get(
  "/count/my/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.countMyBlogs,
);

userRouter.get(
  "/get/users/:userId/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.getUserBlogs,
);

userRouter.get(
  "/count/users/:userId/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.countUserBlogs,
);

userRouter.delete(
  "/delete/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.deleteBlog,
);

userRouter.put(
  "/update/blogs",
  AuthMiddleware.verifyAccessToken,
  blogActions.updateBlog,
);

userRouter.post(
  "/create/blog",
  AuthMiddleware.verifyAccessToken,
  blogActions.newBlog,
);

// comments
userRouter.get(
  "/get/all/comments",
  AuthMiddleware.verifyAccessToken,
  commentActions.getAllComments,
);

userRouter.get(
  "/count/all/commnets",
  AuthMiddleware.verifyAccessToken,
  commentActions.countAllComments,
);

userRouter.get(
  "/get/my/commnets",
  AuthMiddleware.verifyAccessToken,
  commentActions.getMyComments,
);

userRouter.get(
  "/count/my/comments",
  AuthMiddleware.verifyAccessToken,
  commentActions.countMyComments,
);

userRouter.get(
  "/get/users/:userId/blogs/:blogId/comments",
  AuthMiddleware.verifyAccessToken,
  commentActions.getUserComments,
);

userRouter.get(
  "/count/users/:userId/blogs/:blogId/comments",
  AuthMiddleware.verifyAccessToken,
  commentActions.countUserComments,
);

userRouter.delete(
  "/delete/blogs/:blogId/comments",
  AuthMiddleware.verifyAccessToken,
  commentActions.deleteComment,
);

userRouter.put(
  "/update/blogs/:blogId/comments",
  AuthMiddleware.verifyAccessToken,
  commentActions.updateComment,
);

userRouter.post(
  "/create/blogs/:blogId/comment",
  AuthMiddleware.verifyAccessToken,
  commentActions.newComment,
);
