"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPostsUseCase = void 0;
const findAllPostsUseCase = (dependencies) => {
    const { postRepositories: { findAllPosts } } = dependencies;
    return {
        execute: (data) => {
            return findAllPosts(data);
        }
    };
};
exports.findAllPostsUseCase = findAllPostsUseCase;
