"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post('/add', controller_1.createBook);
router.get('/', controller_1.getAllBooks);
router.get('/:id', controller_1.getBookById);
router.put('/:id', controller_1.updateBook);
router.delete('/:id', controller_1.deleteBook);
exports.default = router;
