"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createPostController_1 = require("./createPostController");
const fetchAllposts_1 = require("./fetchAllposts");
const deletePost_1 = require("./deletePost");
const editPost_1 = require("./editPost");
const findUsersPost_1 = require("./findUsersPost");
const repostController_1 = require("./repostController");
const controllers = (dependencies) => {
    return {
        createPost: (0, createPostController_1.createPostController)(dependencies),
        fetchAllPosts: (0, fetchAllposts_1.fetchAllposts)(dependencies),
        deletePost: (0, deletePost_1.deletePostController)(dependencies),
        editPost: (0, editPost_1.editPostController)(dependencies),
        findUsersPost: (0, findUsersPost_1.findUsersPostController)(dependencies),
        repost: (0, repostController_1.repostController)(dependencies)
    };
};
exports.controllers = controllers;
