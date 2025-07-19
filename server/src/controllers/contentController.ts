import { db } from "../db";
import { content, proverbs, stories, users, art, music } from "../db/schema";
import type { Request, Response } from "express";
import { CATEGORIES } from "../utils";
import { desc, eq } from "drizzle-orm";

// Helper function to format contributor data
const formatContributor = (item: any) => {
  return item.contributorId
    ? {
        id: item.contributorId,
        firstName: item.contributorFirstName,
        lastName: item.contributorLastName,
        email: item.contributorEmail,
        region: item.contributorRegion,
        bio: item.contributorBio,
      }
    : null;
};

// Helper function to get content with contributor info
const getContentWithContributor = () => ({
  id: content.id,
  title: content.title,
  description: content.description,
  isFeatured: content.isFeatured,
  region: content.region,
  status: content.status,
  categoryId: content.categoryId,
  createdAt: content.createdAt,
  updatedAt: content.updatedAt,
  contributorId: users.id,
  contributorFirstName: users.firstName,
  contributorLastName: users.lastName,
  contributorEmail: users.email,
  contributorRegion: users.region,
  contributorBio: users.bio,
});

// Helper function to sort content by date
const sortContentByDate = (content: any[]) => {
  return content.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
};

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

  async addArt(req: Request, res: Response) {
    try {
      const {
        coverImage,
        timeToCreate,
        technique,
        medium,
        difficulty,
        content: artContent,
        bookingName,
        bookingAddress,
        bookingHours,
        bookingPhone,
        bookingEmail,
        bookingUrl,
        bookingLat,
        bookingLong,
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
          categoryId: CATEGORIES.ART,
          contributorId,
          region,
        })
        .returning({
          id: content.id,
        });

      // then store in art table
      const [artEntry] = await db
        .insert(art)
        .values({
          contentId: contentData.id,
          coverImage,
          timeToCreate,
          technique,
          medium,
          difficulty,
          content: artContent,
          bookingName,
          bookingAddress,
          bookingHours,
          bookingPhone,
          bookingEmail,
          bookingUrl,
          bookingLat,
          bookingLong,
        })
        .returning({
          id: art.contentId,
        });

      return res.status(200).json({
        message: "Art added successfully",
        art: artEntry,
        content: contentData,
      });
    } catch (error) {
      console.error("Error adding art: ", error);
      return res.status(500).json({ message: "Error adding art: " + error });
    }
  },

  async getArt(req: Request, res: Response) {
    try {
      const artData = await db
        .select({
          artId: art.contentId,
          coverImage: art.coverImage,
          timeToCreate: art.timeToCreate,
          technique: art.technique,
          medium: art.medium,
          difficulty: art.difficulty,
          content: art.content,
          bookingName: art.bookingName,
          bookingAddress: art.bookingAddress,
          bookingHours: art.bookingHours,
          bookingPhone: art.bookingPhone,
          bookingEmail: art.bookingEmail,
          bookingUrl: art.bookingUrl,
          bookingLat: art.bookingLat,
          bookingLong: art.bookingLong,
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
        .from(art)
        .leftJoin(content, eq(art.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .orderBy(desc(content.createdAt))
        .limit(10);

      const formattedArt = artData.map((art) => ({
        id: art.artId,
        title: art.title,
        description: art.description,
        content: art.content,
        coverImage: art.coverImage,
        timeToCreate: art.timeToCreate,
        technique: art.technique,
        medium: art.medium,
        difficulty: art.difficulty,
        isFeatured: art.isFeatured,
        region: art.region,
        status: art.status,
        categoryId: art.categoryId,
        createdAt: art.createdAt,
        updatedAt: art.updatedAt,
        contributor: art.contributorId
          ? {
              id: art.contributorId,
              firstName: art.contributorFirstName,
              lastName: art.contributorLastName,
              email: art.contributorEmail,
              region: art.contributorRegion,
              bio: art.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedArt);
    } catch (error) {
      console.error("Error getting art: ", error);
      return res.status(500).json({ message: "Error getting art: " + error });
    }
  },

  async getArtById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Art ID is required" });
      }

      const artData = await db
        .select({
          artId: art.contentId,
          coverImage: art.coverImage,
          timeToCreate: art.timeToCreate,
          technique: art.technique,
          medium: art.medium,
          difficulty: art.difficulty,
          content: art.content,
          bookingName: art.bookingName,
          bookingAddress: art.bookingAddress,
          bookingHours: art.bookingHours,
          bookingPhone: art.bookingPhone,
          bookingEmail: art.bookingEmail,
          bookingUrl: art.bookingUrl,
          bookingLat: art.bookingLat,
          bookingLong: art.bookingLong,
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
        .from(art)
        .leftJoin(content, eq(art.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .where(eq(art.contentId, id));

      if (!artData || artData.length === 0) {
        return res.status(404).json({ message: "Art not found" });
      }

      const formattedArt = artData.map((art) => ({
        id: art.artId,
        title: art.title,
        description: art.description,
        content: art.content,
        coverImage: art.coverImage,
        timeToCreate: art.timeToCreate,
        technique: art.technique,
        medium: art.medium,
        difficulty: art.difficulty,
        isFeatured: art.isFeatured,
        region: art.region,
        status: art.status,
        categoryId: art.categoryId,
        createdAt: art.createdAt,
        updatedAt: art.updatedAt,
        contributor: art.contributorId
          ? {
              id: art.contributorId,
              firstName: art.contributorFirstName,
              lastName: art.contributorLastName,
              email: art.contributorEmail,
              region: art.contributorRegion,
              bio: art.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedArt[0]);
    } catch (error) {
      console.error("Error getting art by id: ", error);
      return res
        .status(500)
        .json({ message: "Error getting art by id: " + error });
    }
  },

  async addMusic(req: Request, res: Response) {
    try {
      const {
        coverImage,
        genre,
        audioUrl,
        tags,
        tempo,
        content: musicContent,
        title,
        description,
        isFeatured,
        region,
        contributorId,
      } = req.body;

      if (
        !title ||
        !description ||
        !coverImage ||
        !tags ||
        !isFeatured ||
        !region ||
        !contributorId ||
        !genre ||
        !audioUrl ||
        !musicContent
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // first store in content table
      const [contentData] = await db
        .insert(content)
        .values({
          title,
          description,
          isFeatured,
          categoryId: CATEGORIES.SONGS,
          contributorId,
          region,
        })
        .returning({
          id: content.id,
        });

      // then store in music table
      const [musicEntry] = await db
        .insert(music)
        .values({
          contentId: contentData.id,
          genre,
          audioUrl,
          tags,
          tempo,
          content: musicContent,
          coverImage,
        })
        .returning({
          id: music.contentId,
        });

      return res.status(200).json({
        message: "Music added successfully",
        music: musicEntry,
        content: contentData,
      });
    } catch (error) {
      console.error("Error adding music: ", error);
      return res.status(500).json({ message: "Error adding music: " + error });
    }
  },

  async getMusic(_req: Request, res: Response) {
    try {
      const musicData = await db
        .select({
          musicId: music.contentId,
          coverImage: music.coverImage,
          genre: music.genre,
          audioUrl: music.audioUrl,
          tags: music.tags,
          tempo: music.tempo,
          content: music.content,
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
        .from(music)
        .leftJoin(content, eq(music.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .orderBy(desc(content.createdAt))
        .limit(10);

      const formattedMusic = musicData.map((music) => ({
        id: music.musicId,
        title: music.title,
        description: music.description,
        content: music.content,
        coverImage: music.coverImage,
        genre: music.genre,
        audioUrl: music.audioUrl,
        tags: music.tags,
        tempo: music.tempo,
        isFeatured: music.isFeatured,
        region: music.region,
        status: music.status,
        categoryId: music.categoryId,
        createdAt: music.createdAt,
        updatedAt: music.updatedAt,
        contributor: music.contributorId
          ? {
              id: music.contributorId,
              firstName: music.contributorFirstName,
              lastName: music.contributorLastName,
              email: music.contributorEmail,
              region: music.contributorRegion,
              bio: music.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedMusic);
    } catch (error) {
      console.error("Error getting music: ", error);
      return res.status(500).json({ message: "Error getting music: " + error });
    }
  },

  async getMusicById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Music ID is required" });
      }

      const musicData = await db
        .select({
          musicId: music.contentId,
          coverImage: music.coverImage,
          genre: music.genre,
          audioUrl: music.audioUrl,
          tags: music.tags,
          tempo: music.tempo,
          content: music.content,
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
        .from(music)
        .leftJoin(content, eq(music.contentId, content.id))
        .leftJoin(users, eq(content.contributorId, users.id))
        .where(eq(music.contentId, id));

      if (!musicData || musicData.length === 0) {
        return res.status(404).json({ message: "Music not found" });
      }

      const formattedMusic = musicData.map((music) => ({
        id: music.musicId,
        title: music.title,
        description: music.description,
        content: music.content,
        coverImage: music.coverImage,
        genre: music.genre,
        audioUrl: music.audioUrl,
        tags: music.tags,
        tempo: music.tempo,
        isFeatured: music.isFeatured,
        region: music.region,
        status: music.status,
        categoryId: music.categoryId,
        createdAt: music.createdAt,
        updatedAt: music.updatedAt,
        contributor: music.contributorId
          ? {
              id: music.contributorId,
              firstName: music.contributorFirstName,
              lastName: music.contributorLastName,
              email: music.contributorEmail,
              region: music.contributorRegion,
              bio: music.contributorBio,
            }
          : null,
      }));

      return res.status(200).json(formattedMusic[0]);
    } catch (error) {
      console.error("Error getting music by id: ", error);
      return res
        .status(500)
        .json({ message: "Error getting music by id: " + error });
    }
  },

  async getContributorContent(req: Request, res: Response) {
    const { id: contributorId } = req.params;

    if (!contributorId) {
      return res.status(400).json({ message: "Contributor ID is required" });
    }

    try {
      // Common fields across all content types
      const baseFields = {
        id: content.id,
        title: content.title,
        description: content.description,
        isFeatured: content.isFeatured,
        region: content.region,
        categoryId: content.categoryId,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
        contributorId: content.contributorId,
        contributorFirstName: users.firstName,
        contributorLastName: users.lastName,
        contributorEmail: users.email,
        contributorRegion: users.region,
        contributorBio: users.bio,
      };

      // Helper to fetch content by type
      const fetchContentByType = <T extends Record<string, any>>(
        specificFields: T,
        joinTable: any,
        joinCondition: any
      ) => {
        return db
          .select({ ...baseFields, ...specificFields })
          .from(content)
          .innerJoin(joinTable, joinCondition)
          .leftJoin(users, eq(content.contributorId, users.id))
          .where(eq(content.contributorId, contributorId));
      };

      // Define content-specific fields
      const storiesPromise = fetchContentByType(
        {
          coverImage: stories.coverImage,
          readTime: stories.readTime,
          storyContent: stories.content,
          moralLesson: stories.moralLesson,
          context: stories.context,
          difficulty: stories.difficulty,
        },
        stories,
        eq(content.id, stories.contentId)
      );

      const proverbsPromise = fetchContentByType(
        {
          proverbCategory: proverbs.proverbCategory,
          difficulty: proverbs.difficulty,
          proverbContent: proverbs.content,
          englishTranslation: proverbs.englishTranslation,
        },
        proverbs,
        eq(content.id, proverbs.contentId)
      );

      const artPromise = fetchContentByType(
        {
          coverImage: art.coverImage,
          timeToCreate: art.timeToCreate,
          technique: art.technique,
          medium: art.medium,
          difficulty: art.difficulty,
          artContent: art.content,
          bookingName: art.bookingName,
          bookingAddress: art.bookingAddress,
          bookingHours: art.bookingHours,
          bookingPhone: art.bookingPhone,
          bookingEmail: art.bookingEmail,
          bookingUrl: art.bookingUrl,
          bookingLat: art.bookingLat,
          bookingLong: art.bookingLong,
        },
        art,
        eq(content.id, art.contentId)
      );

      const musicPromise = fetchContentByType(
        {
          genre: music.genre,
          audioUrl: music.audioUrl,
          tags: music.tags,
          tempo: music.tempo,
          musicContent: music.content,
          coverImage: music.coverImage,
        },
        music,
        eq(content.id, music.contentId)
      );

      const [storiesData, proverbsData, artData, musicData] = await Promise.all(
        [storiesPromise, proverbsPromise, artPromise, musicPromise]
      );

      // Fetch contributor metadata
      const [contributor] = await db
        .select()
        .from(users)
        .where(eq(users.id, contributorId));

      if (!contributor) {
        return res.status(404).json({ message: "Contributor not found" });
      }

      // Transform all content into a unified format
      const formatContent = (
        data: any[],
        type: string,
        transform: (item: any) => any
      ) =>
        data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          isFeatured: item.isFeatured,
          region: item.region,
          categoryId: item.categoryId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          contentType: type,
          typeSpecificData: transform(item),
        }));

      const unifiedContent = [
        ...formatContent(storiesData, "stories", (item) => ({
          coverImage: item.coverImage,
          readTime: item.readTime,
          content: item.storyContent,
          moralLesson: item.moralLesson,
          context: item.context,
          difficulty: item.difficulty,
        })),
        ...formatContent(proverbsData, "proverbs", (item) => ({
          proverbCategory: item.proverbCategory,
          difficulty: item.difficulty,
          content: item.proverbContent,
          englishTranslation: item.englishTranslation,
        })),
        ...formatContent(artData, "art", (item) => ({
          coverImage: item.coverImage,
          timeToCreate: item.timeToCreate,
          technique: item.technique,
          medium: item.medium,
          difficulty: item.difficulty,
          content: item.artContent,
          bookingName: item.bookingName,
          bookingAddress: item.bookingAddress,
          bookingHours: item.bookingHours,
          bookingPhone: item.bookingPhone,
          bookingEmail: item.bookingEmail,
          bookingUrl: item.bookingUrl,
          bookingLat: item.bookingLat,
          bookingLong: item.bookingLong,
        })),
        ...formatContent(musicData, "music", (item) => ({
          genre: item.genre,
          audioUrl: item.audioUrl,
          tags: item.tags,
          tempo: item.tempo,
          content: item.musicContent,
          coverImage: item.coverImage,
        })),
      ];

      // Sort by createdAt (descending)
      unifiedContent.sort((a, b) => {
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();
        return dateB - dateA;
      });

      return res.status(200).json({
        contributor: {
          id: contributor.id,
          firstName: contributor.firstName,
          lastName: contributor.lastName,
          email: contributor.email,
          region: contributor.region,
          bio: contributor.bio,
          createdAt: contributor.createdAt,
          updatedAt: contributor.updatedAt,
          role: contributor.role,
        },
        content: unifiedContent,
      });
    } catch (error) {
      console.error("Error fetching contributor content:", error);
      return res.status(500).json({
        message: "Failed to fetch contributor content",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
export default ContentController;
