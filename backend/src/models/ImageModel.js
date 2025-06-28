import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    data: Buffer,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamp: true },
);

export default mongoose.model("profile_pictures", imageSchema);
