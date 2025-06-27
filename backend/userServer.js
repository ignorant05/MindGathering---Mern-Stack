import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import userRouter from "./routes/UserRoutes.js";

const PORT = process.env.USER_SERVER_PORT || 3003;

const corsOptions = {
  origin: `http://localhost:${PORT}`,
  Credential: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`connected on PORT: ${PORT}`);
});
