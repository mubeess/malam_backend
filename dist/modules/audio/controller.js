"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAudio = exports.deleteAudio = exports.updateAudio = exports.getAudioById = exports.getAudioByBookId = exports.createAudio = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const audioSchema_1 = require("../../db/schemas/audioSchema");
const schemas_1 = require("../../db/schemas");
const createAudio = async (req, res) => {
    try {
        const audioData = req.body;
        const [newAudio] = await schemas_1.db
            .insert(audioSchema_1.audioSchema)
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
    }
    catch (error) {
        console.error('Create audio error:', error);
        return res.status(500).json({ message: 'Server error during audio creation' });
    }
};
exports.createAudio = createAudio;
const getAudioByBookId = async (req, res) => {
    try {
        const { bookId } = req.params;
        const audioList = await schemas_1.db
            .select()
            .from(audioSchema_1.audioSchema)
            .where((0, drizzle_orm_1.eq)(audioSchema_1.audioSchema.bookId, Number(bookId)));
        return res.status(200).json({
            message: 'Audio retrieved successfully',
            audio: audioList,
        });
    }
    catch (error) {
        console.error('Get audio by book ID error:', error);
        return res.status(500).json({ message: 'Server error during audio retrieval' });
    }
};
exports.getAudioByBookId = getAudioByBookId;
const getAudioById = async (req, res) => {
    try {
        const { id } = req.params;
        const [audio] = await schemas_1.db
            .select()
            .from(audioSchema_1.audioSchema)
            .where((0, drizzle_orm_1.eq)(audioSchema_1.audioSchema.id, Number(id)));
        if (!audio) {
            return res.status(404).json({ message: 'Audio not found' });
        }
        return res.status(200).json({
            message: 'Audio retrieved successfully',
            audio,
        });
    }
    catch (error) {
        console.error('Get audio by ID error:', error);
        return res.status(500).json({ message: 'Server error during audio retrieval' });
    }
};
exports.getAudioById = getAudioById;
const updateAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const [updatedAudio] = await schemas_1.db
            .update(audioSchema_1.audioSchema)
            .set({
            ...updateData,
            updatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(audioSchema_1.audioSchema.id, Number(id)))
            .returning();
        if (!updatedAudio) {
            return res.status(404).json({ message: 'Audio not found' });
        }
        return res.status(200).json({
            message: 'Audio updated successfully',
            audio: updatedAudio,
        });
    }
    catch (error) {
        console.error('Update audio error:', error);
        return res.status(500).json({ message: 'Server error during audio update' });
    }
};
exports.updateAudio = updateAudio;
const deleteAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const [deletedAudio] = await schemas_1.db
            .delete(audioSchema_1.audioSchema)
            .where((0, drizzle_orm_1.eq)(audioSchema_1.audioSchema.id, Number(id)))
            .returning();
        if (!deletedAudio) {
            return res.status(404).json({ message: 'Audio not found' });
        }
        return res.status(200).json({
            message: 'Audio deleted successfully',
            audio: deletedAudio,
        });
    }
    catch (error) {
        console.error('Delete audio error:', error);
        return res.status(500).json({ message: 'Server error during audio deletion' });
    }
};
exports.deleteAudio = deleteAudio;
const searchAudio = async (req, res) => {
    try {
        const { query, bookId } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        let results;
        if (bookId) {
            results = await schemas_1.db
                .select()
                .from(audioSchema_1.audioSchema)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(audioSchema_1.audioSchema.bookId, Number(bookId)), (0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(audioSchema_1.audioSchema.title, `%${query}%`), (0, drizzle_orm_1.ilike)(audioSchema_1.audioSchema.description, `%${query}%`))));
        }
        else {
            results = await schemas_1.db
                .select()
                .from(audioSchema_1.audioSchema)
                .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(audioSchema_1.audioSchema.title, `%${query}%`), (0, drizzle_orm_1.ilike)(audioSchema_1.audioSchema.description, `%${query}%`)));
        }
        return res.status(200).json({
            message: 'Search completed successfully',
            results,
        });
    }
    catch (error) {
        console.error('Search audio error:', error);
        return res.status(500).json({ message: 'Server error during audio search' });
    }
};
exports.searchAudio = searchAudio;
