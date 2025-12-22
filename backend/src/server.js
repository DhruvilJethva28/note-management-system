import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
import Noteroute from "./routes/note.route.js";

dotenv.config();

const app = express();

// middleware
//app.use(cors());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth",router)
app.use("/notes",Noteroute)

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
