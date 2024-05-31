"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCommentsUseCase = void 0;
const findAllCommentsUseCase = (dependencies) => {
    const { commentsRepositories: { findAllComments } } = dependencies;
    return {
        execute: (postId) => {
            try {
                return findAllComments(postId);
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
    };
};
exports.findAllCommentsUseCase = findAllCommentsUseCase;
