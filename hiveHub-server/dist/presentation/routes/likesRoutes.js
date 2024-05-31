"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesRoutes = void 0;
const express_1 = require("express");
const likes_1 = require("../controllers/likes");
const currentUser_1 = require("../middlewares/currentUser");
const likesRoutes = (dependencies, notificationsDependencies) => {
    const { likePost, fetchMylikes, fetchPostLikedUsers } = (0, likes_1.controllers)(dependencies, notificationsDependencies);
    const router = (0, express_1.Router)();
    router.route('/like-post/:postId').post(currentUser_1.currentUser, likePost);
    router.route('/fetch-my-likes').get(currentUser_1.currentUser, fetchMylikes);
    router.route('/fetch-post-liked-users').get(currentUser_1.currentUser, fetchPostLikedUsers);
    return router;
};
exports.likesRoutes = likesRoutes;
