"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networksRoutes = void 0;
const express_1 = require("express");
const networks_1 = require("../controllers/networks/");
const currentUser_1 = require("../middlewares/currentUser");
const isUserBlocked_1 = require("../middlewares/isUserBlocked");
const networksRoutes = (dependencies, notificationDependencies) => {
    const { connectionRequest, fetchAllNetworks, fetchFollowing, fetchFollowers, unfollow, searchUser } = (0, networks_1.controllers)(dependencies, notificationDependencies);
    const router = (0, express_1.Router)();
    router.route('/connection-request/:id').post(currentUser_1.currentUser, isUserBlocked_1.isUserBlocked, connectionRequest);
    router.route('/fetch-all-networks').get(currentUser_1.currentUser, fetchAllNetworks);
    router.route('/fetch-following').get(currentUser_1.currentUser, fetchFollowing);
    router.route('/fetch-followers').get(currentUser_1.currentUser, fetchFollowers);
    router.route('/unfollow/:id').delete(currentUser_1.currentUser, unfollow);
    router.route('/search-user').get(currentUser_1.currentUser, searchUser);
    return router;
};
exports.networksRoutes = networksRoutes;
