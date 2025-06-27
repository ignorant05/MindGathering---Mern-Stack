import multer from "multer";
import RefreshTokenModel from "../models/RefreshTokenModel.js";
import UserModel from "../models/UserModel.js";
import TokensUtils from "../utils/TokensUtils.js";
import ImageModel from "../models/ImageModel.js";

const userActions = {
  register: async (req, res) => {
    const { username, email, password } = req?.body || {};

    if (!username || !email || !password) {
      return res.status(403).json({ error: "Cannot accept empty fields" });
    }

    await UserModel.create({ username, email, password })
      .then((user) => {
        const { password, ...credsWithoutPassword } = user;

        return res.status(201).json({
          message: "Registered",
          user: credsWithoutPassword,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  login: async (req, res) => {
    const { username, email, password } = req?.body || {};

    if (!username || !email || !password) {
      return res.status(403).json({ error: "Cannot accept empty fields" });
    }

    try {
      const userFromDB = await UserModel.findOne({ username, email });
      if (!userFromDB || !(await userFromDB.matchPasswords(password))) {
      }
      const { password, ...credsWithoutPassword } = user;

      const access_token = TokensUtils.generateAccessToken(user._id);
      const refresh_token = TokensUtils.generateRefreshToken(user._id);

      res.headers.set("Authorization", `Bearer ${access_token}`);

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600,
      });

      return res.status(201).json({
        message: "Logged In",
        user: credsWithoutPassword,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id, username, email, oldPassword, newPassword } = req?.body || {};

      if (!username || !email || !oldPassword) {
        return res.status(403).json({ error: "Cannot accept empty fields" });
      }

      const updatedPass = newPassword ? newPassword : oldPassword;

      const user = await UserModel.findOneAndUpdate(
        {
          uid: id,
          password: oldPassword,
        },
        { username: username, email: email, password: updatedPass },
        { new: true },
      );
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or password incorrect" });
      }
      if (req.profilePic) {
        const pic = new Image({
          name: req.profilePic.originalname,
          type: req.profilePic.mimetype,
          data: req.profilePic.buffer,
          user: id,
        });

        const image = await ImageModel.findOne({ user: id });

        if (image) {
          await ImageModel.findOneAndUpdate({ user: id }, pic);
        } else {
          await image.save();
        }
      }

      const { password, ...credsWithoutPassword } = user;

      const access_token = TokensUtils.generateAccessToken(user._id);
      const refresh_token = TokensUtils.generateRefreshToken(user._id);

      res.setHeader("Authorization", `Bearer ${access_token}`);

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600,
      });

      return res.status(201).json({
        message: "updated",
        user: credsWithoutPassword,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  logout: async (req, res) => {
    const refresh_token = req?.cookies?.refresh_token;
    if (!refresh_token) {
      return res
        .status(404)
        .json({ error: "No refresh token sent with request" });
    }

    await RefreshTokenModel.findOneAndDelete({ token: refresh_token })
      .then(() => {
        res.status(200).json({ message: "Logged out" });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "Something went wrong while logging out",
          message: err.message,
        });
      });
  },
  profile: async (req, res) => {
    const uid = req.user._id;

    if (!uid) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserModel.findOneById(uid)
      .then((user) => {
        return res.status(200).json({ user: user });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "Something went wrong while logging out",
          message: err.message,
        });
      });
  },
  getMyPic: async (req, res) => {
    try {
      const uid = req.user._id;

      if (!uid) {
        return res.status(404).json({ error: "User not found" });
      }

      const image = await ImageModel.findOne({ user: userId });
      res.set("Content-Type", image.type);
      res.send(image.data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong",
        message: err.message,
      });
    }
  },
  getUserPic: async (req, res) => {
    try {
      const { userId } = req?.query || {};

      if (!userId) {
        return res.status(404).json({ error: "User not found" });
      }

      const image = await ImageModel.findOne({ user: userId });
      res.set("Content-Type", image.type);
      res.send(image.data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong",
        message: err.message,
      });
    }
  },
  delete: async (req, res) => {
    const refresh_token = req?.cookies?.refresh_token;
    const access_token = req.access_token;
    if (!refresh_token) {
      return res
        .status(404)
        .json({ error: "No refresh token sent with request" });
    }
    try {
      await UserModel.findOneAndDeleteById({ _id: access_token.sub });
      await RefreshTokenModel.findOneAndDeleteById({
        _id: refresh_token.sub,
      });

      res.status(200).json({ message: "Logged out" });
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong while logging out",
        message: err.message,
      });
    }
  },
  refresh: async (req, res) => {
    const refresh_token = req.refresh_token || null;
    const access_token = TokensUtils.generateAccessToken(refresh_token.sub);
    res.headers.set("Authorization", `Bearer ${access_token}`);
  },
};

export default userActions;
