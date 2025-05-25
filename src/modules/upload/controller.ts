// @ts-nocheck
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { Response, Request } from 'express';

import { config } from 'dotenv';
import s3 from '../../config/s3Config';
config();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'malam-app',
    // acl: 'public-read', // or 'public-read' if you want files to be publicly accessible
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, // Added to support Content Type
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
const uploadFile = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error,
    });
  }
};

export const uploadController = {
  uploadFile,
};
