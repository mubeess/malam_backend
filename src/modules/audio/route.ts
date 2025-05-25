// @ts-nocheck
import express from 'express';
import {
  createAudio,
  deleteAudio,
  getAudioByBookId,
  getAudioById,
  searchAudio,
  updateAudio,
} from './controller';
// import { validateAuth } from "../middleware/auth"; // Assuming you have this middleware

const router = express.Router();

// Middleware to protect routes
// router.use(validateAuth);

/**
 * @route   POST /api/audio
 * @desc    Create a new audio reference
 * @access  Private
 */
router.post('/', createAudio);

/**
 * @route   GET /api/audio/book/:bookId
 * @desc    Get all audio references for a specific book
 * @access  Private
 */
router.get('/book/:bookId', getAudioByBookId);

/**
 * @route   GET /api/audio/:id
 * @desc    Get a single audio reference by ID
 * @access  Private
 */
router.get('/:id', getAudioById);

/**
 * @route   PUT /api/audio/:id
 * @desc    Update an audio reference
 * @access  Private
 */
router.put('/:id', updateAudio);

/**
 * @route   DELETE /api/audio/:id
 * @desc    Delete an audio reference
 * @access  Private
 */
router.delete('/:id', deleteAudio);

/**
 * @route   GET /api/audio/search
 * @desc    Search audio references by title or description
 * @access  Private
 */
router.get('/search', searchAudio);

export default router;
