import jwt from "jsonwebtoken";
import RefreshTokenModel from "../models/RefreshTokenModel.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const verifyAccessToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No authorization header found..." });
  }

  const access_token = authorizationHeader.split(" ")[1] || null;

  if (!access_token) {
    return res
      .status(401)
      .json({ error: "Invalid or expired access token..." });
  }
  try {
    const decoded_token = jwt.verify(access_token, ACCESS_TOKEN_SECRET) || null;
    const user = await UserModel.findOneById(decoded_token.sub).select(
      "-password",
      "-refresh_token",
    );
    if (!user) {
      return res.status(404).json({ error: "User not found..." });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid or expired access token...",
      message: err.message,
    });
  }
};

const verifyRefreshToken = async (req, res, next) => {
  const refresh_token = req?.cookies?.refresh_token;

  if (!refresh_token) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    const decoded_token = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);
    await RefreshTokenModel.findOne(refresh_token)
      .then((token) => {
        if (token.user._id != decoded_token.sub) {
          return res.status(401).json({ error: "Invalid token sub" });
        }
      })
      .then((err) => {
        return res.status(500).json({ error: err.message });
      });

    req.refresh_token = decoded_token;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Invalid refresh token", message: err.messages });
  }
};

export default { verifyAccessToken, verifyRefreshToken };
