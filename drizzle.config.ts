import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
const environment = process.env.NODE_ENV || 'development';
const databaseUrls: Record<string, string> = {
  development: process.env.DEV_DATABASE_URL!,
  staging: process.env.STAGING_DATABASE_URL!,
  production: process.env.PROD_DATABASE_URL!,
};

// Select the appropriate URL based on the environment
const dbUrl = databaseUrls[environment];
if (!dbUrl) {
  throw new Error(`Missing database URL for environment: ${environment}`);
}

export default defineConfig({
  out: './drizzle/migrations', // Directory for generated migrations
  schema: './src/db/schemas/schema.ts', // Path to your schema
  dialect: 'postgresql', // Database dialect
  dbCredentials: {
    url: dbUrl, // Dynamically selected database URL
  },
  verbose: true, // Enable verbose logging
  strict: true, // Enable strict mode
});
