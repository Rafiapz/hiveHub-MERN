"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const fetchMyLikes_1 = require("./fetchMyLikes");
const fetchPostLikedUsers_1 = require("./fetchPostLikedUsers");
const likePost_1 = require("./likePost");
const controllers = (dependencies, notificationsDependencies) => {
    return {
        likePost: (0, likePost_1.likePostController)(dependencies, notificationsDependencies),
        fetchMylikes: (0, fetchMyLikes_1.fetchMyLikesController)(dependencies),
        fetchPostLikedUsers: (0, fetchPostLikedUsers_1.fetchPostLikedUsersController)(dependencies)
    };
};
exports.controllers = controllers;
