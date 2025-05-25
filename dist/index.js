"use strict";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importStar(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./db/routes/routes");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
const port = 3000;
// Middleware
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, express_1.json)());
app.get('/', async (req, res) => {
    res.send('Hello World!');
});
//Routes
(0, routes_1.setupRoutes)(app);
server.listen(port, () => {
    console.log(`Example App listening on port ${port}`);
});
// Export the serverless handler
// export const handler = serverless(app);
exports.default = app;
