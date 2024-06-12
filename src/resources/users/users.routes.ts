import express from "express";
import { auth } from "../../middleware/auth";

import {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} from "./users.controllers";

const router = express.Router();

// GET /users: Retrieve a list of users.
// GET /users/{userId}: Retrieve a specific user by ID.
// POST /users: Create a new user.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.

// CRUD for users
router.get("/users", auth, getUsers);
router.get("/users/:id", auth, getUser);
router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);

export default router;
