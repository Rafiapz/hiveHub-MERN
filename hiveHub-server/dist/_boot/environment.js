"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envNumber = exports.envString = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envString = (variable, defaultValue) => {
    const value = process.env[variable] || defaultValue;
    if (value == null) {
        throw new TypeError(`
        Required environment variable ${variable} is undefined and has no default
        `);
    }
    return value;
};
exports.envString = envString;
const envNumber = (variable, defaultValue) => {
    const value = Number(process.env[variable]) || defaultValue;
    if (value == null) {
        throw new TypeError(`
        Required environment variable ${variable} is undefined and has no default
        `);
    }
    return value;
};
exports.envNumber = envNumber;
