"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
console.log();
// // AWS S3 Configuration
const s3 = new client_s3_1.S3Client({
    region: 'us-east-1', // Your bucket's region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
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
exports.default = s3;
