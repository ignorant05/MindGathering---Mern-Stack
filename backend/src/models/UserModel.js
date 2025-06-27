import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    refresh_token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "refresh_tokens",
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcryptjs.genSalt(10);
  this.password = bcryptjs.hash(this.password, salt);
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const data = this.getUpdate();
  const salt = await bcryptjs.genSalt(10);

  if (data.password) data.password = bcryptjs.hash(data.password, salt);

  next();
});

userSchema.methods.matchPasswords = async function (passwordToVerify) {
  return await bcryptjs.compare(passwordToVerify, this.password);
};

export default mongoose.model("Users", userSchema);
