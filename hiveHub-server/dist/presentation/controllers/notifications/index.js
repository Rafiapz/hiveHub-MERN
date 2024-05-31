"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const deleteNotification_1 = require("./deleteNotification");
const fetchNotifications_1 = require("./fetchNotifications");
const controllers = (dependencies) => {
    return {
        fetchNotifications: (0, fetchNotifications_1.fetchNotificationsController)(dependencies),
        deleteNotification: (0, deleteNotification_1.deleteNotificationController)(dependencies)
    };
};
exports.controllers = controllers;
