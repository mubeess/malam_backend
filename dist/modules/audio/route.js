"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
// import { validateAuth } from "../middleware/auth"; // Assuming you have this middleware
const router = express_1.default.Router();
// Middleware to protect routes
// router.use(validateAuth);
/**
 * @route   POST /api/audio
 * @desc    Create a new audio reference
 * @access  Private
 */
router.post('/', controller_1.createAudio);
/**
 * @route   GET /api/audio/book/:bookId
 * @desc    Get all audio references for a specific book
 * @access  Private
 */
router.get('/book/:bookId', controller_1.getAudioByBookId);
/**
 * @route   GET /api/audio/:id
 * @desc    Get a single audio reference by ID
 * @access  Private
 */
router.get('/:id', controller_1.getAudioById);
/**
 * @route   PUT /api/audio/:id
 * @desc    Update an audio reference
 * @access  Private
 */
router.put('/:id', controller_1.updateAudio);
/**
 * @route   DELETE /api/audio/:id
 * @desc    Delete an audio reference
 * @access  Private
 */
router.delete('/:id', controller_1.deleteAudio);
/**
 * @route   GET /api/audio/search
 * @desc    Search audio references by title or description
 * @access  Private
 */
router.get('/search', controller_1.searchAudio);
exports.default = router;
