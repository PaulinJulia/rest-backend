import express from "express";
import userRoutes from "./resources/users/users.routes";
import jobRouters from "./resources/jobs/jobs.routes";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript with Express!');
// });
app.use("/api", userRoutes);
app.use("/api", jobRouters);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
