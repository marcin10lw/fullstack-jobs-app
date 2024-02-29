require("dotenv").config();
import express from "express";
import { prisma } from "./db/prisma";
import { notFoundMiddleware } from "./middleware/notFound";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
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
