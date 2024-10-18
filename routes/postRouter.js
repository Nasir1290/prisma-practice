import { Router } from "express";
import { createPost, getAllPost, getSinglePost, updatePost } from "../controllers/postController.js";
import authentication from "../middlewares/authentication.js";

const router = Router();


router.get("/posts",authentication ,getAllPost)
router.get("/post/:id",authentication ,getSinglePost)
router.post("/create-post",authentication ,createPost)
router.patch("/update-post/:id",authentication ,updatePost)


export const postRouter = router;