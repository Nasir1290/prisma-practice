import { Router } from "express";
import { logInUser, logOutUser, signUpUser } from "../controllers/userController.js";
import authentication from "../middlewares/authentication.js";

const router = Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.get("/logout", authentication, logOutUser);

export default router;
