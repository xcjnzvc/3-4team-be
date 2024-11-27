import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/api.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api", router);
const port = 8000;

app.listen(port, () => console.log(`${port}서버시작`));
