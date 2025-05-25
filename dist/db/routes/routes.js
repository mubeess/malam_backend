"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
// @ts-nocheck
const route_1 = __importDefault(require("../../modules/auth/route"));
const route_2 = __importDefault(require("../../modules/books/route"));
const route_3 = __importDefault(require("../../modules/audio/route"));
const route_4 = __importDefault(require("../../modules/videos/route"));
const route_5 = __importDefault(require("../../modules/upload/route"));
const setupRoutes = (app) => {
    app.use('/auth', route_1.default);
    app.use('/books', route_2.default);
    app.use('/audio', route_3.default);
    app.use('/video', route_4.default);
    app.use('/file', route_5.default);
    //   app.use("/profile", profileRouters);
    //   app.use("/rfq", rfqRouters);
};
exports.setupRoutes = setupRoutes;
