import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/authRoute.js";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(morgan("combined"));

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/v1/auth", authRouter);

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    app.listen(3001, () =>
      console.log(`server port http://localhost:3001 is running !!!`)
    )
  );
