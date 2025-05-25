import express from 'express';
import { uploadController } from './controller';

const router = express.Router();

// Define the upload endpoint
router.post('/upload', async (req, res) => {
  console.log(req.body);
  await uploadController.uploadFile(req, res);
});

export default router;
