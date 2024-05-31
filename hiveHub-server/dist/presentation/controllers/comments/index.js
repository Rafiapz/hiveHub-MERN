"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const fetchAllComments_1 = require("./fetchAllComments");
const createComment_1 = require("./createComment");
const deleteComment_1 = require("./deleteComment");
const editComment_1 = require("./editComment");
const createReplyComment_1 = require("./createReplyComment");
const fetchAllReplies_1 = require("./fetchAllReplies");
const deleteReplyComment_1 = require("./deleteReplyComment");
const likeComment_1 = require("./likeComment");
const fetchCommentLikes_1 = require("./fetchCommentLikes");
const controllers = (dependencies, notificationsDependencies) => {
    return {
        fetchAllComments: (0, fetchAllComments_1.fetChAllCommentsController)(dependencies),
        createComment: (0, createComment_1.createCommentController)(dependencies, notificationsDependencies),
        deleteComment: (0, deleteComment_1.deleteCommentController)(dependencies),
        updateComment: (0, editComment_1.updateCommentController)(dependencies),
        createReplyComment: (0, createReplyComment_1.createReplyCommentController)(dependencies),
        fetchAllReplies: (0, fetchAllReplies_1.fetchAllRepliesController)(dependencies),
        deleteReplyComment: (0, deleteReplyComment_1.deleteReplyCommentController)(dependencies),
        likeComment: (0, likeComment_1.likeCommentController)(dependencies),
        fetchCommentLikes: (0, fetchCommentLikes_1.fetchCommentLikesController)(dependencies)
    };
};
exports.controllers = controllers;
