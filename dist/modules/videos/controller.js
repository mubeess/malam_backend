"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVideos = exports.deleteVideo = exports.updateVideo = exports.getVideoById = exports.getVideosByBookId = exports.createVideo = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const videoSchema_1 = require("../../db/schemas/videoSchema");
const schemas_1 = require("../../db/schemas");
const createVideo = async (req, res) => {
    try {
        const videoData = req.body;
        const [newVideo] = await schemas_1.db
            .insert(videoSchema_1.videoSchema)
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
    }
    catch (error) {
        console.error('Create video error:', error);
        return res.status(500).json({ message: 'Server error during video creation' });
    }
};
exports.createVideo = createVideo;
const getVideosByBookId = async (req, res) => {
    try {
        const { bookId } = req.params;
        const videoList = await schemas_1.db
            .select()
            .from(videoSchema_1.videoSchema)
            .where((0, drizzle_orm_1.eq)(videoSchema_1.videoSchema.bookId, Number(bookId)));
        return res.status(200).json({
            message: 'Videos retrieved successfully',
            videos: videoList,
        });
    }
    catch (error) {
        console.error('Get videos by book ID error:', error);
        return res.status(500).json({ message: 'Server error during videos retrieval' });
    }
};
exports.getVideosByBookId = getVideosByBookId;
const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [video] = await schemas_1.db
            .select()
            .from(videoSchema_1.videoSchema)
            .where((0, drizzle_orm_1.eq)(videoSchema_1.videoSchema.id, Number(id)));
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        return res.status(200).json({
            message: 'Video retrieved successfully',
            video,
        });
    }
    catch (error) {
        console.error('Get video by ID error:', error);
        return res.status(500).json({ message: 'Server error during video retrieval' });
    }
};
exports.getVideoById = getVideoById;
const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const [updatedVideo] = await schemas_1.db
            .update(videoSchema_1.videoSchema)
            .set({
            ...updateData,
            updatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(videoSchema_1.videoSchema.id, Number(id)))
            .returning();
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        return res.status(200).json({
            message: 'Video updated successfully',
            video: updatedVideo,
        });
    }
    catch (error) {
        console.error('Update video error:', error);
        return res.status(500).json({ message: 'Server error during video update' });
    }
};
exports.updateVideo = updateVideo;
const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const [deletedVideo] = await schemas_1.db
            .delete(videoSchema_1.videoSchema)
            .where((0, drizzle_orm_1.eq)(videoSchema_1.videoSchema.id, Number(id)))
            .returning();
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        return res.status(200).json({
            message: 'Video deleted successfully',
            video: deletedVideo,
        });
    }
    catch (error) {
        console.error('Delete video error:', error);
        return res.status(500).json({ message: 'Server error during video deletion' });
    }
};
exports.deleteVideo = deleteVideo;
const searchVideos = async (req, res) => {
    try {
        const { query, bookId } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        let results;
        if (bookId) {
            results = await schemas_1.db
                .select()
                .from(videoSchema_1.videoSchema)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(videoSchema_1.videoSchema.bookId, Number(bookId)), (0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(videoSchema_1.videoSchema.title, `%${query}%`), (0, drizzle_orm_1.ilike)(videoSchema_1.videoSchema.description, `%${query}%`))));
        }
        else {
            results = await schemas_1.db
                .select()
                .from(videoSchema_1.videoSchema)
                .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(videoSchema_1.videoSchema.title, `%${query}%`), (0, drizzle_orm_1.ilike)(videoSchema_1.videoSchema.description, `%${query}%`)));
        }
        return res.status(200).json({
            message: 'Search completed successfully',
            results,
        });
    }
    catch (error) {
        console.error('Search videos error:', error);
        return res.status(500).json({ message: 'Server error during videos search' });
    }
};
exports.searchVideos = searchVideos;
