import { Request, Response } from 'express';
import { eq, and, or, ilike } from 'drizzle-orm';
import { videoSchema } from '../../db/schemas/videoSchema';
import type { InferSelectModel } from 'drizzle-orm';
import { db } from '../../db/schemas';

// Define the type for video references
export type VideoReference = InferSelectModel<typeof videoSchema>;

export const createVideo = async (req: Request, res: Response) => {
  try {
    const videoData: Omit<VideoReference, 'id' | 'createdAt' | 'updatedAt'> = req.body;

    const [newVideo] = await db
      .insert(videoSchema)
      .values({
        ...videoData,
        thumnail: req.body.thumbnail,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return res.status(201).json({
      message: 'Video created successfully',
      video: newVideo,
    });
  } catch (error) {
    console.error('Create video error:', error);
    return res.status(500).json({ message: 'Server error during video creation' });
  }
};

export const getVideosByBookId = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const videoList = await db
      .select()
      .from(videoSchema)
      .where(eq(videoSchema.bookId, Number(bookId)));

    return res.status(200).json({
      message: 'Videos retrieved successfully',
      videos: videoList,
    });
  } catch (error) {
    console.error('Get videos by book ID error:', error);
    return res.status(500).json({ message: 'Server error during videos retrieval' });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [video] = await db
      .select()
      .from(videoSchema)
      .where(eq(videoSchema.id, Number(id)));

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    return res.status(200).json({
      message: 'Video retrieved successfully',
      video,
    });
  } catch (error) {
    console.error('Get video by ID error:', error);
    return res.status(500).json({ message: 'Server error during video retrieval' });
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<Omit<VideoReference, 'id' | 'bookId' | 'createdAt'>> = req.body;

    const [updatedVideo] = await db
      .update(videoSchema)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(videoSchema.id, Number(id)))
      .returning();

    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    return res.status(200).json({
      message: 'Video updated successfully',
      video: updatedVideo,
    });
  } catch (error) {
    console.error('Update video error:', error);
    return res.status(500).json({ message: 'Server error during video update' });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [deletedVideo] = await db
      .delete(videoSchema)
      .where(eq(videoSchema.id, Number(id)))
      .returning();

    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    return res.status(200).json({
      message: 'Video deleted successfully',
      video: deletedVideo,
    });
  } catch (error) {
    console.error('Delete video error:', error);
    return res.status(500).json({ message: 'Server error during video deletion' });
  }
};

export const searchVideos = async (req: Request, res: Response) => {
  try {
    const { query, bookId } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    let results;

    if (bookId) {
      results = await db
        .select()
        .from(videoSchema)
        .where(
          and(
            eq(videoSchema.bookId, Number(bookId)),
            or(ilike(videoSchema.title, `%${query}%`), ilike(videoSchema.description, `%${query}%`))
          )
        );
    } else {
      results = await db
        .select()
        .from(videoSchema)
        .where(
          or(ilike(videoSchema.title, `%${query}%`), ilike(videoSchema.description, `%${query}%`))
        );
    }

    return res.status(200).json({
      message: 'Search completed successfully',
      results,
    });
  } catch (error) {
    console.error('Search videos error:', error);
    return res.status(500).json({ message: 'Server error during videos search' });
  }
};
