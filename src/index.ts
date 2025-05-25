// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// // Determine the current environment
// const environment = process.env.NODE_ENV || "dev"; // Default to "development" if NODE_ENV is not set

// // Database URLs for different environments
// const databaseUrls: Record<string, string> = {
//   dev: process.env.DEV_DATABASE_URL!,
//   stag: process.env.STAGING_DATABASE_URL!,
//   prod: process.env.PROD_DATABASE_URL!,
// };

// // Select the appropriate URL based on the environment
// const dbUrl = databaseUrls[environment];
// if (!dbUrl) {
//   throw new Error(`Missing database URL for environment: ${environment}`);
// }

// console.log(`Using database URL for ${environment}: ${dbUrl}`);

// // Configure the PostgreSQL pool

// const sql = neon(dbUrl);
// const db = drizzle(sql);

// export default db;
// // const result = await db.execute("select 1");
// @ts-nocheck

import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import cors from 'cors';

import { setupRoutes } from './db/routes/routes';

import { eq } from 'drizzle-orm';

const app = express();
const server = createServer(app);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const port = 3000;

// Middleware
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

//Routes
setupRoutes(app);

server.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});

// Export the serverless handler
// export const handler = serverless(app);

export default app;
