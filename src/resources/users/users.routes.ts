import express from "express";
import { auth } from "../../middleware/auth";
import authRoutes from "./auth.routes";

// Import handlers  from users.controller.js
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./users.controllers";

const router = express.Router();

// GET /users: Retrieve a list of users.
// GET /users/{userId}: Retrieve a specific user by ID.
// POST /users: Create a new user.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.

// Autentiserings- och användarhanteringsrutter
router.use(authRoutes);

// CRUD for users
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
