import { db } from "../db";
import { categories, submissions } from "../db/schema";
import type { Request, Response } from "express";
import { and, desc, eq } from "drizzle-orm";
import { APPROVED_STATUS } from "../utils";

const SubmissionController = {
  async getAllApprovedSubmissions(req: Request, res: Response) {
    try {
      const submissionsData = await db
        .select({
          id: submissions.id,
          title: submissions.title,
          description: submissions.description,
          content: submissions.content,
          categoryId: submissions.categoryId,
          imageUrl: submissions.imageUrl,
          submittedAt: submissions.submittedAt,
          status: submissions.status,
          reviewedBy: submissions.reviewedBy,
          locationName: submissions.locationName,
          storageUrl: submissions.storageUrl,
          category: categories.name,
        })
        .from(submissions)
        .where(eq(submissions.status, APPROVED_STATUS))
        .leftJoin(categories, eq(submissions.categoryId, categories.id))
        .orderBy(desc(submissions.submittedAt));
      return res.status(200).json(submissionsData);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      return res
        .status(500)
        .json({ message: "Error fetching submissions, " + error });
    }
  },

  async getSubmissionById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const [submission] = await db
        .select({
          id: submissions.id,
          title: submissions.title,
          description: submissions.description,
          content: submissions.content,
          categoryId: submissions.categoryId,
          imageUrl: submissions.imageUrl,
          submittedAt: submissions.submittedAt,
          status: submissions.status,
          reviewedBy: submissions.reviewedBy,
          locationName: submissions.locationName,
          storageUrl: submissions.storageUrl,
          category: categories.name,
        })
        .from(submissions)
        .where(eq(submissions.id, id))
        .leftJoin(categories, eq(submissions.categoryId, categories.id))
        .limit(1);
      return res.status(200).json(submission);
    } catch (error) {
      console.error("Error fetching submission with id:", id, error);
      return res
        .status(500)
        .json({ message: "Error fetching submission, " + error });
    }
  },

  async getSubmissionsByCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    try {
      const submissionsData = await db
        .select({
          id: submissions.id,
          title: submissions.title,
          description: submissions.description,
          content: submissions.content,
          categoryId: submissions.categoryId,
          imageUrl: submissions.imageUrl,
          submittedAt: submissions.submittedAt,
          status: submissions.status,
          reviewedBy: submissions.reviewedBy,
          locationName: submissions.locationName,
          storageUrl: submissions.storageUrl,
          category: categories.name,
        })
        .from(submissions)
        .where(
          and(
            eq(submissions.categoryId, parseInt(categoryId)),
            eq(submissions.status, APPROVED_STATUS)
          )
        )
        .leftJoin(categories, eq(submissions.categoryId, categories.id))
        .orderBy(desc(submissions.submittedAt));
      return res.status(200).json(submissionsData);
    } catch (error) {
      console.error("Error fetching submissions by category:", error);
      return res
        .status(500)
        .json({ message: "Error fetching submissions by category, " + error });
    }
  },
};

export default SubmissionController;
