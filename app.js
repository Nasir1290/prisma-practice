import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { urlencoded } from "express";
import userRouter from "./routes/userRoute.js";
import { postRouter } from "./routes/postRouter.js";

const app = express();

// middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("welcome to the server...");
});
app.use("/user",userRouter);
app.use("/post",postRouter);


app.use("*",(req,res)=> {
  res.status(404).json({message: "Page not found"})
})

export default app;
