import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: string,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  },
  { timestamp: true },
);

export default mongoose.Model("Comments", commentSchema);
