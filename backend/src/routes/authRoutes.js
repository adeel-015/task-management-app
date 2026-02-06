import express from "express";
import {
  register,
  login,
  getCurrentUser,
} from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", authenticate, getCurrentUser);

export default router;
