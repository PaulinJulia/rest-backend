import { prisma } from "../../db/connect";
import { Request, Response } from "express";

//Get all favorite jobs - GET /jobs
export async function getJobs(req: Request, res: Response) {
  try {
    const jobs = await prisma.favoriteJob.findMany();

    if (!jobs.length) return res.status(404).json({ message: "No jobs found" });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

// Get job - GET /jobs/:id
export async function getJob(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const job = await prisma.favoriteJob.findUnique({
      where: {
        id: id,
      },
    });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Get jobs by user - GET /users/:userId/jobs
export async function getJobsByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const jobs = await prisma.favoriteJob.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    if (!jobs.length)
      return res
        .status(404)
        .json({ message: "No favorite job found for this user" });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

// Create/save job by user - POST /users/:userId/jobs
export async function createJobByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { headline, brief, employer } = req.body;

    const job = await prisma.favoriteJob.create({
      data: {
        headline,
        brief,
        employer,
        userId: parseInt(userId),
      },
    });

    res.status(201).json({ id: job.id, message: "Favorite job created!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Update job - PUT /jobs/:id
export async function updateJob(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { headline, brief, employer } = req.body;

    const job = await prisma.favoriteJob.update({
      where: {
        id: id,
      },
      data: {
        headline,
        brief,
        employer,
      },
    });

    if (!job)
      return res.status(404).json({ error: "Favorite job not updated!" });

    res.status(200).json({ message: "Favorite job updated!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Delete favorite job - DELETE /jobs/:id
export async function deleteJob(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const job = await prisma.favoriteJob.delete({
      where: {
        id: id,
      },
    });

    if (!job)
      return res.status(404).json({ error: "Favorite job not deleted!" });

    res.status(200).json({ message: "Favorite job deleted!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}
