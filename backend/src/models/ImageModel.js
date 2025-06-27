import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    name: {
      type: string,
    },
    type: {
      type: string,
    },
    data: Buffer,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamp: true },
);

export default mongoose.Model("profile_pictures", imageSchema);
