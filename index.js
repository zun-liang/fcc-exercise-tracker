import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("api/users", router);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
