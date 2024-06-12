import express from "express";
import userRouter from "./resources/users/users.routes";
import jobRouter from "./resources/jobs/jobs.routes";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRouter);
app.use("/api", jobRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
