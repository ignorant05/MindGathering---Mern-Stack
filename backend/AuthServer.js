import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import DBConnect from "./src/configuration/MongoDBConfig.js";
import authRouter from "./src/router/AuthRouter.js";

const PORT = process.env.AUTH_SERVER_PORT || 3001;

DBConnect();

const app = express();

const corsOptions = {
  origin: `http://localhost:${PORT}`,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
