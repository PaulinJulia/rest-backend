import express from "express";

import { getJobs, getJob, getJobsByUser, updateJob, createJobByUser, deleteJob } from "./jobs.controllers"

const router = express.Router();

// GET /jobs: Retrieve a list of favorite jobs.
// POST /jobs: Create/save a new favorite job.
// GET /jobs/{postId}: Retrieve a specific job by ID.
// PUT /jobs/{postId}: Update a specific job by ID.
// DELETE /jobs/{postId}: Delete a specific job by ID.
// GET /users/{userId}/jobs: Retrieve all favorite jobs by a specific user.
// POST /users/{userId}/jobs: Create a new favorite job for a specific user.

// CRUD for posts
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJob);
router.get("/users/:userId/jobs", getJobsByUser);
router.put("/jobs/:id", updateJob);
router.post("/users/:userId/jobs", createJobByUser);
router.delete("/jobs/:id", deleteJob);

export default router;
