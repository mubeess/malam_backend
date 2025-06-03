import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

// Determine the current environment
const environment = process.env.NODE_ENV || 'development'; // Default to "development" if NODE_ENV is not set

// Database URLs for different environments
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

console.log(`Using database URL for ${environment}: ${dbUrl}`);

// Configure the PostgreSQL pool
const pool = new pg.Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: true, // Use this if your database requires SSL
  },
});

export const db = drizzle(pool);
