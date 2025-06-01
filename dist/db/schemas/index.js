"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = __importDefault(require("pg"));
// Determine the current environment
const environment = process.env.NODE_ENV || 'dev'; // Default to "development" if NODE_ENV is not set
// Database URLs for different environments
const databaseUrls = {
    dev: process.env.DEV_DATABASE_URL,
    stage: process.env.STAGING_DATABASE_URL,
    prod: process.env.PROD_DATABASE_URL,
};
// Select the appropriate URL based on the environment
const dbUrl = databaseUrls[environment];
if (!dbUrl) {
    throw new Error(`Missing database URL for environment: ${environment}`);
}
console.log(`Using database URL for ${environment}: ${dbUrl}`);
// Configure the PostgreSQL pool
const pool = new pg_1.default.Pool({
    connectionString: dbUrl,
    ssl: {
        rejectUnauthorized: true, // Use this if your database requires SSL
    },
});
exports.db = (0, node_postgres_1.drizzle)(pool);
