import { Router } from "express";
import { register, login, logOut } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logOut);


export default router;