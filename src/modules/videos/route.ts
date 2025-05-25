// @ts-nocheck
import express from 'express';
import {
  createVideo,
  deleteVideo,
  getVideoById,
  getVideosByBookId,
  searchVideos,
  updateVideo,
} from '../videos/controller';
// import { validateAuth } from "../middleware/auth"; // Assuming you have this middleware

const router = express.Router();

// Middleware to protect routes
// router.use(validateAuth);

/**
 * @route   POST /api/videos
 * @desc    Create a new video reference
 * @access  Private
 */
router.post('/', createVideo);

/**
 * @route   GET /api/videos/book/:bookId
 * @desc    Get all video references for a specific book
 * @access  Private
 */
router.get('/book/:bookId', getVideosByBookId);

/**
 * @route   GET /api/videos/:id
 * @desc    Get a single video reference by ID
 * @access  Private
 */
router.get('/:id', getVideoById);

/**
 * @route   PUT /api/videos/:id
 * @desc    Update a video reference
 * @access  Private
 */
router.put('/:id', updateVideo);

/**
 * @route   DELETE /api/videos/:id
 * @desc    Delete a video reference
 * @access  Private
 */
router.delete('/:id', deleteVideo);

/**
 * @route   GET /api/videos/search
 * @desc    Search video references by title or description
 * @access  Private
 */
router.get('/search', searchVideos);

export default router;
