"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const express_1 = require("express");
const currentUser_1 = require("../middlewares/currentUser");
const chats_1 = require("../controllers/chats");
const multer_1 = require("../../_lib/multer");
const chatRoutes = (dependencies) => {
    const { createConvesation, createChat, fetchConversations, fetchChats, onlineUsers } = (0, chats_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/create-conversation').post(currentUser_1.currentUser, createConvesation);
    router.route('/fetch-conversations/:userId').get(currentUser_1.currentUser, fetchConversations);
    router.route('/create-message/:type').post(currentUser_1.currentUser, multer_1.uploadSingleFile, createChat);
    router.route('/fetch-messages/:id').get(currentUser_1.currentUser, fetchChats);
    router.route('/fetch-online-users').get(currentUser_1.currentUser, onlineUsers);
    router.route('/send-video/:type').post(createChat);
    return router;
};
exports.chatRoutes = chatRoutes;
