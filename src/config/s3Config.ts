import AWS from 'aws-sdk';

import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

console.log();
// // AWS S3 Configuration
const s3 = new S3Client({
  region: 'us-east-1', // Your bucket's region
  credentials: {
    accessKeyId: (process.env.AWS_ACCESS_KEY_ID as string) || '',
    secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY as string) || '',
  },
});
// // const s3 = new AWS.S3({
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
// //   region: process.env.AWS_REGION as string,
// // });

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();

export default s3;
