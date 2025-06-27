import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("refresh_tokens", refreshTokenSchema);
