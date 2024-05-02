import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/authRoute.js";
import morgan from "morgan";

const app = express();

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("combined"));

app.use("/v1/auth", authRouter);

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        `server port http://localhost:${process.env.PORT} is running !!!`
      )
    )
  );
