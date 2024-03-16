require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import { prisma } from "./db/prisma";
import { notFoundMiddleware } from "./middleware/notFound";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import jobsRouter from "./routes/job.route";
import { authMiddleware } from "./middleware/auth";

const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "localhost:5173",
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobsRouter);

app.get("/api/v1/auth-check", authMiddleware, (req, res) => {
  res.json("you are all set");
});

app.get("/health-check", (req, res) => {
  res.send("JEST GITES");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
