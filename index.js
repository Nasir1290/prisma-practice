import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { urlencoded } from "express";
import router from "./routes/route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use(router);
app.get("/", (req, res) => {
  res.send("welcome !");
});

app.use("*",(req,res)=> {
  res.status(404).json({message: "Page not found"})
})

export default app;
