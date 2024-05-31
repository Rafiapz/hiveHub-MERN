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
exports.fetchPostLikedUsersController = void 0;
const fetchPostLikedUsersController = (dependencies) => {
    const { likesUseCases: { findLikedUsersUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.postId)) {
                throw new Error('PostId not found');
            }
            const data = {
                postId: (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.postId
            };
            const users = yield findLikedUsersUseCase(dependencies).execute(data);
            res.status(200).json({ status: 'ok', data: users });
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.fetchPostLikedUsersController = fetchPostLikedUsersController;
