"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineUsersController = void 0;
const socket_1 = require("../../../_boot/socket");
const getOnlineUsersController = (req, res) => {
    try {
        let onlineUsers = (0, socket_1.getOnlineUsers)();
        onlineUsers = onlineUsers.map((ob) => {
            return ob.userId;
        });
        res.status(200).json({ status: 'ok', data: onlineUsers });
    }
    catch (error) {
        res.status(error.status || 500).json({ status: 'failed', message: error.message });
    }
};
exports.getOnlineUsersController = getOnlineUsersController;
