import BlogModel from "../models/BlogModel.js";

const blogActions = {
  newBlog: async (req, res) => {
    const { title, content } = req?.body || {};

    if (!title || !content) {
      return res.status(403).json({ error: "Cannot accept empty fields" });
    }

    await BlogModel.create({ title, content })
      .then(() => {
        return res.status(201).json({
          message: "created",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getBlog: async (req, res) => {
    const { blogId } = req?.query || {};

    if (!blogId) {
      return res.status(403).json({ error: "Invalid blog id" });
    }

    await BlogModel.findOneById(blogId)
      .then((blog) => {
        return res.status(201).json({
          message: "success",
          blog: blog,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getAllBlogs: async (req, res) => {
    await BlogModel.find()
      .then((blogs) => {
        return res.status(201).json({
          message: "success",
          blogs: blogs,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  pagination: async (req, res) => {
    const { page, size } = req?.query || {};
    if (!page || !size) {
      return res.status(401).json({ error: "invalid size or page number" });
    }

    await BlogModel.find()
      .limit(size * 1)
      .skip((page - 1) * limit)
      .exec()
      .then((blogs) => {
        return res.status(201).json({
          message: "success",
          blogs: blogs,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getMyBlogs: async (req, res) => {
    await BlogModel.find({ author: req.user._id })
      .then((blog) => {
        return res.status(201).json({
          message: "success",
          blog: blog,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  getUserBlogs: async (req, res) => {
    const { userId } = req?.params || {};

    if (!userId) {
      return res.status(403).json({ error: "Invalid user id" });
    }

    await BlogModel.find({ author: userId })
      .then((blog) => {
        return res.status(201).json({
          message: "success",
          blog: blog,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  deleteBlog: async (req, res) => {
    const { blogId } = req?.query || {};

    if (!blogId) {
      return res.status(403).json({ error: "Invalid blog id" });
    }

    await BlogModel.findOneAndDelete({ _id: blogId })
      .then(() => {
        return res.status(201).json({
          message: "success",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  updateBlog: async (req, res) => {
    const { blogId } = req?.query || {};
    const { content, title } = req?.body || {};

    if (!content || !title) {
      return res.status(403).json({ error: "Invalid fields" });
    }

    if (!blogId) {
      return res.status(403).json({ error: "Invalid blog id" });
    }

    await BlogModel.findOneAndUpdate({ _id: blogId }, { title, content })
      .then(() => {
        return res.status(201).json({
          message: "success",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  countAllBlogs: async (req, res) => {
    await BlogModel.countDocuments()
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
  countMyBlogs: async (req, res) => {
    async function countDocs(query = { author: req.user._id }) {
      await BlogModel.countDocuments(query)
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
  countUserBlogs: async (req, res) => {
    const { userId } = req?.params || {};

    if (!userId) {
      return res.status(403).json({ error: "Invalid user id" });
    }

    async function countDocs(query = { author: userId }) {
      await BlogModel.countDocuments(query)
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

export default blogActions;
