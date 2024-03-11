import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://fani:FanKeo@cluster0.f0rvub6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
  console.log("ERROR: ", error);
});

app.use("/", router());

server.listen(8000, () => {
  console.log("Server Running on http://localhost:8000/");
});
