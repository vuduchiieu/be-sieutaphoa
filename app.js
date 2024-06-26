import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import authRouter from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("combined"));

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRoute);

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    app.listen(3001, () =>
      console.log(`server port http://localhost:3001 is running !!!`)
    )
  );

export default app;
