import path from "path";
import express from "express";
import dotenv from "dotenv";
import authRoute from "./route/auth.route.js";
import connectDB from "./db/connection.js";
import messageRoute from "./route/message.route.js";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js";
// import cors from "cors";
import { server, app } from "./socket/socket.js";

// const app = express();
dotenv.config();
const port = process.env.Port || 5000;
const __dirname = path.resolve();

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoute);
app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Hello bal");
// });

server.listen(port, () => {
  connectDB();
  console.log(`server runing on port ${port}`);
});
