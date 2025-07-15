import { db } from "../db";
import { content, proverbs, stories, users } from "../db/schema";
import type { Request, Response } from "express";
import { CATEGORIES } from "../utils";
import { desc, eq } from "drizzle-orm";

const ContentController = {
  async addStory(req: Request, res: Response) {
    try {
      const {
        coverImage,
        readTime,
        content: storyContent,
        moralLesson,
        context,
        difficulty,
        title,
        description,
        isFeatured,
        region,
        contributorId,
      } = req.body;

      //   first store in content table
      const [contentData] = await db
        .insert(content)
        .values({
          title,
          description,
          isFeatured,
          categoryId: CATEGORIES.STORIES,
          contributorId,
          region,
        })
        .returning({
          id: content.id,
        });

      const story = await db
        .insert(stories)
        .values({
          contentId: contentData.id,
          coverImage,
          readTime,
          content: storyContent,
          moralLesson,
          context,
          difficulty,
        })
        .returning({
          id: stories.contentId,
        });

      return res.status(200).json({
        message: "Story added successfully",
        story,
        content: contentData,
      });
    } catch (error) {
      console.error("Error adding story: ", error);
      return res.status(500).json({ message: "Error adding story: " + error });
    }
  },

  async getStories(_req: Request, res: Response) {
    try {
      const storiesData = await db
        .select({
          storyId: stories.contentId,
          coverImage: stories.coverImage,
          readTime: stories.readTime,
          content: stories.content,
          moralLesson: stories.moralLesson,
          context: stories.context,
          difficulty: stories.difficulty,
          // Content fields
          id: content.id,
          title: content.title,
          description: content.description,
          isFeatured: content.isFeatured,
          region: content.region,
          status: content.status,
          categoryId: content.categoryId,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          // User fields
          contributorId: users.id,
          contributorFirstName: users.firstName,
          contributorLastName: users.lastName,
          contributorEmail: users.email,
          contributorRegion: users.region,
          contributorBio: users.bio,
        })
        .from(stories)
        .leftJoin(content, eq(stories.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .orderBy(desc(content.createdAt))
        .limit(10);

      // Transform the flat data into structured objects
      const formattedStories = storiesData.map((story) => ({
        id: story.storyId,
        title: story.title,
        description: story.description,
        content: story.content,
        coverImage: story.coverImage,
        readTime: story.readTime,
        moralLesson: story.moralLesson,
        context: story.context,
        difficulty: story.difficulty,
        isFeatured: story.isFeatured,
        region: story.region,
        status: story.status,
        categoryId: story.categoryId,
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
        contributor: story.contributorId
          ? {
              id: story.contributorId,
              firstName: story.contributorFirstName,
              lastName: story.contributorLastName,
              email: story.contributorEmail,
              region: story.contributorRegion,
              bio: story.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedStories);
    } catch (error) {
      console.error("Error getting stories: ", error);
      return res
        .status(500)
        .json({ message: "Error getting stories: " + error });
    }
  },

  async getStoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Story ID is required" });
      }

      const story = await db
        .select({
          storyId: stories.contentId,
          coverImage: stories.coverImage,
          readTime: stories.readTime,
          content: stories.content,
          moralLesson: stories.moralLesson,
          context: stories.context,
          difficulty: stories.difficulty,
          // Content fields
          id: content.id,
          title: content.title,
          description: content.description,
          isFeatured: content.isFeatured,
          region: content.region,
          status: content.status,
          categoryId: content.categoryId,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          // User fields
          contributorId: users.id,
          contributorFirstName: users.firstName,
          contributorLastName: users.lastName,
          contributorEmail: users.email,
          contributorRegion: users.region,
          contributorBio: users.bio,
        })
        .from(stories)
        .where(eq(stories.contentId, id))
        .leftJoin(content, eq(stories.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .limit(1);

      if (!story || story.length === 0) {
        return res.status(404).json({ message: "Story not found" });
      }

      const formattedStory = story.map((story) => ({
        id: story.storyId,
        title: story.title,
        description: story.description,
        content: story.content,
        coverImage: story.coverImage,
        readTime: story.readTime,
        moralLesson: story.moralLesson,
        context: story.context,
        difficulty: story.difficulty,
        isFeatured: story.isFeatured,
        region: story.region,
        status: story.status,
        categoryId: story.categoryId,
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
        contributor: story.contributorId
          ? {
              id: story.contributorId,
              firstName: story.contributorFirstName,
              lastName: story.contributorLastName,
              email: story.contributorEmail,
              region: story.contributorRegion,
              bio: story.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedStory[0]);
    } catch (error) {
      console.error("Error getting story by id: ", error);
      return res.status(500).json({
        message: "Error getting story by id",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  async getFeaturedStories(req: Request, res: Response) {
    try {
      const storiesData = await db
        .select({
          storyId: stories.contentId,
          coverImage: stories.coverImage,
          readTime: stories.readTime,
          content: stories.content,
          moralLesson: stories.moralLesson,
          context: stories.context,
          difficulty: stories.difficulty,
          // Content fields
          id: content.id,
          title: content.title,
          description: content.description,
          isFeatured: content.isFeatured,
          region: content.region,
          status: content.status,
          categoryId: content.categoryId,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          // User fields
          contributorId: users.id,
          contributorFirstName: users.firstName,
          contributorLastName: users.lastName,
          contributorEmail: users.email,
          contributorRegion: users.region,
          contributorBio: users.bio,
        })
        .from(stories)
        .where(eq(content.isFeatured, true))
        .leftJoin(content, eq(stories.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .orderBy(desc(content.createdAt))
        .limit(3);

      // Transform the flat data into structured objects
      const formattedStories = storiesData.map((story) => ({
        id: story.storyId,
        title: story.title,
        description: story.description,
        content: story.content,
        coverImage: story.coverImage,
        readTime: story.readTime,
        moralLesson: story.moralLesson,
        context: story.context,
        difficulty: story.difficulty,
        isFeatured: story.isFeatured,
        region: story.region,
        status: story.status,
        categoryId: story.categoryId,
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
        contributor: story.contributorId
          ? {
              id: story.contributorId,
              firstName: story.contributorFirstName,
              lastName: story.contributorLastName,
              email: story.contributorEmail,
              region: story.contributorRegion,
              bio: story.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedStories);
    } catch (error) {
      console.error("Error getting featured stories: ", error);
      return res
        .status(500)
        .json({ message: "Error getting featured stories" });
    }
  },

  async addProverb(req: Request, res: Response) {
    try {
      const {
        proverbCategory,
        difficulty,
        content: proverbContent,
        englishTranslation,
        title,
        description,
        isFeatured,
        region,
        contributorId,
      } = req.body;

      // first store in content table
      const [contentData] = await db
        .insert(content)
        .values({
          title,
          description,
          isFeatured,
          categoryId: CATEGORIES.PROVERB,
          contributorId,
          region,
        })
        .returning({
          id: content.id,
        });

      const [proverb] = await db
        .insert(proverbs)
        .values({
          contentId: contentData.id,
          proverbCategory,
          difficulty,
          content: proverbContent,
          englishTranslation,
        })
        .returning({
          id: proverbs.contentId,
        });

      return res.status(200).json({
        message: "Proverb added successfully",
        proverb,
        content: contentData,
      });
    } catch (error) {
      console.error("Error adding proverb: ", error);
      return res
        .status(500)
        .json({ message: "Error adding proverb: " + error });
    }
  },

  async getProverbs(req: Request, res: Response) {
    try {
      const proverbsData = await db
        .select({
          proverbId: proverbs.contentId,
          proverbCategory: proverbs.proverbCategory,
          difficulty: proverbs.difficulty,
          content: proverbs.content,
          englishTranslation: proverbs.englishTranslation,
          // Content fields
          id: content.id,
          title: content.title,
          description: content.description,
          isFeatured: content.isFeatured,
          region: content.region,
          status: content.status,
          categoryId: content.categoryId,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          // User fields
          contributorId: users.id,
          contributorFirstName: users.firstName,
          contributorLastName: users.lastName,
          contributorEmail: users.email,
          contributorRegion: users.region,
          contributorBio: users.bio,
        })
        .from(proverbs)
        .leftJoin(content, eq(proverbs.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .orderBy(desc(content.createdAt))
        .limit(10);

      const formattedProverbs = proverbsData.map((proverb) => ({
        id: proverb.proverbId,
        title: proverb.title,
        description: proverb.description,
        content: proverb.content,
        englishTranslation: proverb.englishTranslation,
        difficulty: proverb.difficulty,
        proverbCategory: proverb.proverbCategory,
        isFeatured: proverb.isFeatured,
        region: proverb.region,
        status: proverb.status,
        categoryId: proverb.categoryId,
        createdAt: proverb.createdAt,
        updatedAt: proverb.updatedAt,
        contributor: proverb.contributorId
          ? {
              id: proverb.contributorId,
              firstName: proverb.contributorFirstName,
              lastName: proverb.contributorLastName,
              email: proverb.contributorEmail,
              region: proverb.contributorRegion,
              bio: proverb.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedProverbs);
    } catch (error) {
      console.error("Error getting proverbs: ", error);
      return res
        .status(500)
        .json({ message: "Error getting proverbs: " + error });
    }
  },

  async getProverbById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Proverb ID is required" });
      }

      const proverb = await db
        .select({
          proverbId: proverbs.contentId,
          proverbCategory: proverbs.proverbCategory,
          difficulty: proverbs.difficulty,
          content: proverbs.content,
          englishTranslation: proverbs.englishTranslation,
          // Content fields
          id: content.id,
          title: content.title,
          description: content.description,
          isFeatured: content.isFeatured,
          region: content.region,
          status: content.status,
          categoryId: content.categoryId,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          // User fields
          contributorId: users.id,
          contributorFirstName: users.firstName,
          contributorLastName: users.lastName,
          contributorEmail: users.email,
          contributorRegion: users.region,
          contributorBio: users.bio,
        })
        .from(proverbs)
        .where(eq(proverbs.contentId, id))
        .leftJoin(content, eq(proverbs.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .limit(1);

      if (!proverb || proverb.length === 0) {
        return res.status(404).json({ message: "Proverb not found" });
      }

      const formattedProverb = proverb.map((proverb) => ({
        id: proverb.proverbId,
        title: proverb.title,
        description: proverb.description,
        content: proverb.content,
        englishTranslation: proverb.englishTranslation,
        difficulty: proverb.difficulty,
        proverbCategory: proverb.proverbCategory,
        isFeatured: proverb.isFeatured,
        region: proverb.region,
        status: proverb.status,
        categoryId: proverb.categoryId,
        createdAt: proverb.createdAt,
        updatedAt: proverb.updatedAt,
        contributor: proverb.contributorId
          ? {
              id: proverb.contributorId,
              firstName: proverb.contributorFirstName,
              lastName: proverb.contributorLastName,
              email: proverb.contributorEmail,
              region: proverb.contributorRegion,
              bio: proverb.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedProverb[0]);
    } catch (error) {
      console.error("Error getting proverb by id: ", error);
    }
  },
};
export default ContentController;
