import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authenticate } from "../middleware/auth.js";
import { validateTask, validateTaskUpdate } from "../middleware/validation.js";

const router = express.Router();

// All task routes require authentication
router.use(authenticate);

router.get("/", getAllTasks);
router.post("/", validateTask, createTask);
router.get("/:id", getTaskById);
router.put("/:id", validateTaskUpdate, updateTask);
router.delete("/:id", deleteTask);

export default router;
