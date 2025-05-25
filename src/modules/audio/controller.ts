import { Request, Response } from 'express';
import { eq, and, or, ilike } from 'drizzle-orm';
import { audioSchema } from '../../db/schemas/audioSchema';
import type { InferSelectModel } from 'drizzle-orm';
import { db } from '../../db/schemas';

// Define the type for audio references
export type AudioReference = InferSelectModel<typeof audioSchema>;

export const createAudio = async (req: Request, res: Response) => {
  try {
    const audioData: Omit<AudioReference, 'id' | 'createdAt' | 'updatedAt'> = req.body;

    const [newAudio] = await db
      .insert(audioSchema)
      .values({
        ...audioData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return res.status(201).json({
      message: 'Audio created successfully',
      audio: newAudio,
    });
  } catch (error) {
    console.error('Create audio error:', error);
    return res.status(500).json({ message: 'Server error during audio creation' });
  }
};

export const getAudioByBookId = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const audioList = await db
      .select()
      .from(audioSchema)
      .where(eq(audioSchema.bookId, Number(bookId)));

    return res.status(200).json({
      message: 'Audio retrieved successfully',
      audio: audioList,
    });
  } catch (error) {
    console.error('Get audio by book ID error:', error);
    return res.status(500).json({ message: 'Server error during audio retrieval' });
  }
};

export const getAudioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [audio] = await db
      .select()
      .from(audioSchema)
      .where(eq(audioSchema.id, Number(id)));

    if (!audio) {
      return res.status(404).json({ message: 'Audio not found' });
    }

    return res.status(200).json({
      message: 'Audio retrieved successfully',
      audio,
    });
  } catch (error) {
    console.error('Get audio by ID error:', error);
    return res.status(500).json({ message: 'Server error during audio retrieval' });
  }
};

export const updateAudio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<Omit<AudioReference, 'id' | 'bookId' | 'createdAt'>> = req.body;

    const [updatedAudio] = await db
      .update(audioSchema)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(audioSchema.id, Number(id)))
      .returning();

    if (!updatedAudio) {
      return res.status(404).json({ message: 'Audio not found' });
    }

    return res.status(200).json({
      message: 'Audio updated successfully',
      audio: updatedAudio,
    });
  } catch (error) {
    console.error('Update audio error:', error);
    return res.status(500).json({ message: 'Server error during audio update' });
  }
};

export const deleteAudio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [deletedAudio] = await db
      .delete(audioSchema)
      .where(eq(audioSchema.id, Number(id)))
      .returning();

    if (!deletedAudio) {
      return res.status(404).json({ message: 'Audio not found' });
    }

    return res.status(200).json({
      message: 'Audio deleted successfully',
      audio: deletedAudio,
    });
  } catch (error) {
    console.error('Delete audio error:', error);
    return res.status(500).json({ message: 'Server error during audio deletion' });
  }
};

export const searchAudio = async (req: Request, res: Response) => {
  try {
    const { query, bookId } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    let results;

    if (bookId) {
      results = await db
        .select()
        .from(audioSchema)
        .where(
          and(
            eq(audioSchema.bookId, Number(bookId)),
            or(ilike(audioSchema.title, `%${query}%`), ilike(audioSchema.description, `%${query}%`))
          )
        );
    } else {
      results = await db
        .select()
        .from(audioSchema)
        .where(
          or(ilike(audioSchema.title, `%${query}%`), ilike(audioSchema.description, `%${query}%`))
        );
    }

    return res.status(200).json({
      message: 'Search completed successfully',
      results,
    });
  } catch (error) {
    console.error('Search audio error:', error);
    return res.status(500).json({ message: 'Server error during audio search' });
  }
};
