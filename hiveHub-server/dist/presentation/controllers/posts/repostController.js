"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repostController = void 0;
const repostController = (dependencies) => {
    const { postUseCases: { findOneAndUpdateUseCase, createPostUseCase, updatePostUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const postId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.postId;
            const originalPost = yield findOneAndUpdateUseCase(dependencies).execute(postId);
            if (!originalPost) {
                throw new Error('Unable to repost the post');
            }
            const data = {
                userId: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId,
                content: originalPost === null || originalPost === void 0 ? void 0 : originalPost.content,
                media: originalPost === null || originalPost === void 0 ? void 0 : originalPost.media,
                likes: 0,
                comments: 0,
                shares: 0
            };
            const newPost = yield createPostUseCase(dependencies).execute(data);
            if (!newPost) {
                throw new Error('Unable to repost the post');
            }
            res.status(200).json({ status: 'ok', data: newPost });
        }
        catch (error) {
            console.log(error);
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.repostController = repostController;
