"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = require("dotenv");
const s3Config_1 = __importDefault(require("../../config/s3Config"));
(0, dotenv_1.config)();
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Config_1.default,
        bucket: 'malam-app',
        // acl: 'public-read', // or 'public-read' if you want files to be publicly accessible
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE, // Added to support Content Type
        key: function (req, file, cb) {
            console.log(req.book);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024 * 1024, // 5MB file size limit
        files: 1, // Maximum number of files
    },
    fileFilter: (req, file, cb) => {
        // Add file type validation if needed
        cb(null, true);
    },
});
// Controller functions
const uploadFile = async (req, res) => {
    try {
        // The upload middleware will handle the file upload to S3
        upload.single('file')(req, res, function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            // If upload is successful, return file details
            if (!req.file) {
                console.log(req.file);
                return res.status(400).json({
                    success: false,
                    message: 'Please upload a file',
                });
            }
            const contentType = req.file.mimetype || 'application/octet-stream';
            res.status(200).json({
                success: true,
                file: {
                    //@ts-ignore
                    url: req.file.location,
                    key: `uploads/${Date.now()} - ${req.file.originalname}`, //You can adjust the files name as needed
                    ContentType: contentType, //Explicitly set the content type
                    Body: req.file.buffer,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                },
            });
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error,
        });
    }
};
exports.uploadController = {
    uploadFile,
};
