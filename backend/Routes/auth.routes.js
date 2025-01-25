import express from "express";
import { login, logout, signup } from "../controllers/AuthController.js";
import { loginValidation, signupValidation } from "../Middlewares/AuthValidation.js";
import path from "path";

console.log("Resolved path:", path.resolve("../controllers/AuthController.js"));


const router = express.Router();

router.post("/signup", signupValidation, signup)

router.post("/login", loginValidation, login)

router.post("/logout", logout)

export default router;