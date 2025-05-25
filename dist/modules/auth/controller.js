"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const drizzle_orm_1 = require("drizzle-orm");
const usersSchema_1 = require("../../db/schemas/usersSchema");
const schemas_1 = require("../../db/schemas");
const register = async (req, res) => {
    try {
        const { email, password, name, role = 'user' } = req.body;
        // Check if user already exists
        const existingUser = await schemas_1.db.select().from(usersSchema_1.users).where((0, drizzle_orm_1.eq)(usersSchema_1.users.email, email));
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await schemas_1.db
            .insert(usersSchema_1.users)
            .values({
            email,
            password: hashedPassword,
            name,
            role: role === 'admin' ? 'user' : role, // Prevent creating admin directly
        })
            .returning();
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser[0].id,
                email: newUser[0].email,
                name: newUser[0].name,
                role: newUser[0].role,
            },
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await schemas_1.db.select().from(usersSchema_1.users).where((0, drizzle_orm_1.eq)(usersSchema_1.users.email, email));
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user[0].id, email: user[0].email, role: user[0].role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '8h' });
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user[0].id,
                email: user[0].email,
                name: user[0].name,
                role: user[0].role,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
};
exports.login = login;
