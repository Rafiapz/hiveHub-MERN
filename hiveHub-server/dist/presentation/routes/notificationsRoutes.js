"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsRoutes = void 0;
const express_1 = require("express");
const notifications_1 = require("../controllers/notifications");
const currentUser_1 = require("../middlewares/currentUser");
const notificationsRoutes = (dependencies) => {
    const { fetchNotifications, deleteNotification } = (0, notifications_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/fetch-notifications/:id').get(currentUser_1.currentUser, fetchNotifications);
    router.route('/delete-notification').delete(currentUser_1.currentUser, deleteNotification);
    return router;
};
exports.notificationsRoutes = notificationsRoutes;
