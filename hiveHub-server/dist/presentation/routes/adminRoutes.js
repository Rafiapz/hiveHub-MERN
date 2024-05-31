"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const currentUser_1 = require("../middlewares/currentUser");
const getOnlineUsers_1 = require("../controllers/admin/getOnlineUsers");
const adminRoutes = (dependencies) => {
    const { findAllUsers, blockUnblockUser } = (0, admin_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/find-all-users/:id').get(currentUser_1.isAdmin, findAllUsers);
    router.route('/block-unblock-user').put(currentUser_1.isAdmin, blockUnblockUser);
    router.route('/get-online-users').get(currentUser_1.isAdmin, getOnlineUsers_1.getOnlineUsersController);
    return router;
};
exports.adminRoutes = adminRoutes;
