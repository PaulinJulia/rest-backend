import { prisma } from "../../db/connect"
import { Request, Response } from "express";

/**
 * @description Get all favorite jobs
 * @route GET /jobs
 */
export async function getJobs(req: Request, res: Response) {
  try {
    const ads = await prisma.favoriteJob.findMany();

    if (!ads.length)
      return res.status(404).json({ message: "No jobs found" });

    res.status(200).json(ads);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Get job
 * @route GET /jobs/:id
 */
export async function getJob(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const ad = await prisma.favoriteJob.findUnique({
      where: {
        id: id,
      },
    });

    if (!ad) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(ad);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Get favorite jobs by user
 * @route GET /users/:userId/jobs
 */

export async function getJobsByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const ads = await prisma.favoriteJob.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    if (!ads.length)
      return res.status(404).json({ message: "No favorite job found for this user" });

    res.status(200).json(ads);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Create/save job ad by user
 * @route POST /users/:userId/jobs
 */
export async function createJobByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { headline, brief, employer } = req.body;

    const ad = await prisma.favoriteJob.create({
      data: {
        headline,
        brief,
        employer,
        userId: parseInt(userId),
      },
    });

    res.status(201).json({ id: ad.id, message: "Favorite job created!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Update job
 * @route PUT /jobs/:id
 */

export async function updateJob(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { headline, brief } = req.body;

    const post = await prisma.favoriteJob.update({
      where: {
        id: id,
      },
      data: {
        headline,
        brief,
      },
    });

    if (!post) return res.status(404).json({ error: "Favorite job not updated!" });

    res.status(200).json({ message: "Favorite job updated!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Delete favorite job
 * @route DELETE /jobs/:id
 */

export async function deleteJob(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const post = await prisma.favoriteJob.delete({
      where: {
        id: id,
      },
    });

    if (!post) return res.status(404).json({ error: "Favorite job not deleted!" });

    res.status(200).json({ message: "Favorite job deleted!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}
