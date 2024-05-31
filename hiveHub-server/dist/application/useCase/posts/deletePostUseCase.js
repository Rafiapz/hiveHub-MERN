"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostUseCase = void 0;
const deletePostUseCase = (dependencies) => {
    const { postRepositories: { deletePost } } = dependencies;
    return {
        execute: (data) => {
            try {
                return deletePost(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
    };
};
exports.deletePostUseCase = deletePostUseCase;
