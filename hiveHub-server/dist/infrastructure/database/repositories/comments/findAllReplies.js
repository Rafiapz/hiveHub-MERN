"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllReplies = void 0;
const replyCommentsModel_1 = __importDefault(require("../../models/replyCommentsModel"));
const findAllReplies = (id) => {
    try {
        const allReplies = replyCommentsModel_1.default.find({ commentId: id }).sort({ createdAt: -1 }).populate('userId');
        return allReplies;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.findAllReplies = findAllReplies;
