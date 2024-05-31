"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createChat_1 = require("./createChat");
const createConversation_1 = require("./createConversation");
const fetchConversations_1 = require("./fetchConversations");
const fetchChats_1 = require("./fetchChats");
const fetchOnlineUsers_1 = require("./fetchOnlineUsers");
const controllers = (dependencies) => {
    return {
        createChat: (0, createChat_1.createChatController)(dependencies),
        createConvesation: (0, createConversation_1.createConversationController)(dependencies),
        fetchConversations: (0, fetchConversations_1.fetchAllConversationsByIdController)(dependencies),
        fetchChats: (0, fetchChats_1.fetchMessagesController)(dependencies),
        onlineUsers: fetchOnlineUsers_1.fetchOnlineUsersController
    };
};
exports.controllers = controllers;
