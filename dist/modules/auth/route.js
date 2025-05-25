"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    await (0, controller_1.register)(req, res);
});
router.post("/login", async (req, res) => {
    await (0, controller_1.login)(req, res);
});
exports.default = router;
