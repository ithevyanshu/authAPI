import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/authRoutes"));

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});