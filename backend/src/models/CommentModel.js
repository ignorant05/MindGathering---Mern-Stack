import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
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
  { timestamps: true },
);

export default mongoose.model("Comments", commentSchema);
