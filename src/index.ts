import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(String(process.env.DATABASE_MONGO))
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const { PORT } = process.env;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(` Api: ${PORT}`);
});

// aaa

export default app;
