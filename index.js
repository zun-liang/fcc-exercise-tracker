import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import exerciseRouter from "./routers/exerciseRouter.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/users/:_id", exerciseRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
