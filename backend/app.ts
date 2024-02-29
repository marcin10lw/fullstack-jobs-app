require("dotenv").config();
import express from "express";
import { prisma } from "./db/prisma";

const app = express();

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
