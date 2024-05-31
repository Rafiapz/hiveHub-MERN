"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetPasswordToken = exports.verifyToken = exports.getTokenPayloads = exports.genereateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genereateToken = (payload) => {
    try {
        const secret = process.env.jwtSecret;
        return jsonwebtoken_1.default.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: 60 * 60 * 24,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.genereateToken = genereateToken;
const getTokenPayloads = (token) => {
    try {
        const secret = process.env.jwtSecret;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded) {
            return decoded;
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getTokenPayloads = getTokenPayloads;
const verifyToken = (token) => {
    try {
        const secret = process.env.jwtSecret;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded) {
            return decoded;
        }
        else {
            throw new Error('Failed to verify token');
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.verifyToken = verifyToken;
const generateResetPasswordToken = (payload) => {
    try {
        const secret = process.env.jwtSecret;
        return jsonwebtoken_1.default.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: 60 * 10,
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.generateResetPasswordToken = generateResetPasswordToken;
