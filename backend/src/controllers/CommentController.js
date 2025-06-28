import BlogModel from "../models/BlogModel.js";
import CommentModel from "../models/CommentModel.js";

const commentController = {
  newComment: async (req, res) => {
    const { blogId } = req?.params || {};
    const { content } = req?.body || {};
    if (!blogId) {
      return res.status(401).json({ error: "Invalid blog id" });
    }
    if (!content) {
      return res.status(403).json({ error: "Cannot accept empty fields" });
    }

    await CommentModel.create({ content, author: req.user._id, blog: blogId })
      .then(() => {
        return res.status(201).json({
          message: "created",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getComment: async (req, res) => {
    const { commentId } = req?.query || {};

    if (!commentId) {
      return res.status(403).json({ error: "Invalid comment id" });
    }

    await CommentModel.findOneById(commentId)
      .then((comment) => {
        return res.status(201).json({
          message: "success",
          comment: comment,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getAllComments: async (req, res) => {
    await CommentModel.find()
      .then((comments) => {
        return res.status(201).json({
          message: "success",
          comments: comments,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getMyComments: async (req, res) => {
    await commentModel
      .find({ author: req.user._id })
      .then((comments) => {
        return res.status(201).json({
          message: "success",
          comments: comments,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getUserComments: async (req, res) => {
    const { userId } = req?.params || {};

    if (!userId) {
      return res.status(403).json({ error: "Invalid user id" });
    }

    await CommentModel.find({ author: userId })
      .then((comments) => {
        return res.status(201).json({
          message: "success",
          comments: comments,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  deleteComment: async (req, res) => {
    const { commentId } = req?.query || {};

    if (!commentId) {
      return res.status(403).json({ error: "Invalid comment id" });
    }

    await CommentModel.findOneAndDelete({ _id: commentId })
      .then(() => {
        return res.status(201).json({
          message: "success",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  updateComment: async (req, res) => {
    const { commentId } = req?.query || {};
    const { content } = req?.body || {};

    if (!content) {
      return res.status(403).json({ error: "Invalid fields" });
    }

    if (!commentId) {
      return res.status(403).json({ error: "Invalid comment id" });
    }

    await BlogModel.findOneAndUpdate({ _id: commentId }, { content })
      .then(() => {
        return res.status(201).json({
          message: "success",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  countAllComments: async (req, res) => {
    await CommentModel.countDocuments()
      .then((count) => {
        return res.status(201).json({
          message: "success",
          count: count,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  countMyComments: async (req, res) => {
    async function countDocs(query = { author: req.user._id }) {
      await CommentModel.countDocuments(query)
        .then((count) => {
          return res.status(201).json({
            message: "success",
            count: count,
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    }
    countDocs();
  },
  countUserComments: async (req, res) => {
    const { userId } = req?.params || {};

    if (!userId) {
      return res.status(403).json({ error: "Invalid user id" });
    }

    async function countDocs(query = { author: userId }) {
      await CommentModel.countDocuments(query)
        .then((count) => {
          return res.status(201).json({
            message: "success",
            count: count,
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    }
    countDocs();
  },
};
export default commentController;
