"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const controller_1 = require("../videos/controller");
// import { validateAuth } from "../middleware/auth"; // Assuming you have this middleware
const router = express_1.default.Router();
// Middleware to protect routes
// router.use(validateAuth);
/**
 * @route   POST /api/videos
 * @desc    Create a new video reference
 * @access  Private
 */
router.post('/', controller_1.createVideo);
/**
 * @route   GET /api/videos/book/:bookId
 * @desc    Get all video references for a specific book
 * @access  Private
 */
router.get('/book/:bookId', controller_1.getVideosByBookId);
/**
 * @route   GET /api/videos/:id
 * @desc    Get a single video reference by ID
 * @access  Private
 */
router.get('/:id', controller_1.getVideoById);
/**
 * @route   PUT /api/videos/:id
 * @desc    Update a video reference
 * @access  Private
 */
router.put('/:id', controller_1.updateVideo);
/**
 * @route   DELETE /api/videos/:id
 * @desc    Delete a video reference
 * @access  Private
 */
router.delete('/:id', controller_1.deleteVideo);
/**
 * @route   GET /api/videos/search
 * @desc    Search video references by title or description
 * @access  Private
 */
router.get('/search', controller_1.searchVideos);
exports.default = router;
