"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChatsById = void 0;
const chatsModel_1 = __importDefault(require("../../models/chatsModel"));
const findChatsById = (id) => {
    try {
        const chats = chatsModel_1.default.find({ conversationId: id });
        return chats;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.findChatsById = findChatsById;
