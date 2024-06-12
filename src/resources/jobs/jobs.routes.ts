import express from "express";
//import { auth } from "../../middleware/auth";
import {
  getJobs,
  getJob,
  getJobsByUser,
  updateJob,
  createJobByUser,
  deleteJob,
} from "./jobs.controllers";

const router = express.Router();

// GET /jobs: Retrieve a list of favorite jobs.
// GET /jobs/{jobId}: Retrieve a specific job by ID.
// GET /users/{userId}/jobs: Retrieve all favorite jobs by a specific user.
// POST /users/{userId}/jobs: Create a new favorite job for a specific user.
// PUT /jobs/{jobId}: Update a specific job by ID.
// DELETE /jobs/{jobId}: Delete a specific job by ID.

// POST /users/{userId}/jobs: Create a new favorite job for a specific user.

// CRUD for favorite jobs
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJob);
router.get("/users/:userId/jobs", getJobsByUser);
router.post("/users/:userId/jobs", createJobByUser);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

export default router;
