import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes";

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(` Api: ${PORT}`);
});

// aaa

export default app;
