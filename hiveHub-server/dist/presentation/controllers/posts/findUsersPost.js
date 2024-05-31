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
exports.findUsersPostController = void 0;
const s3_1 = require("../../../_lib/s3");
const findUsersPostController = (dependencies) => {
    const { postUseCases: { findUsersPostUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.target;
            const { posts, likes } = yield findUsersPostUseCase(dependencies).execute(id);
            for (let post of posts) {
                post.media.path = yield (0, s3_1.getObjectSignedUrl)(post.media.path);
            }
            if (posts) {
                res.status(200).json({ status: 'ok', data: { posts, likes }, message: 'success' });
            }
            else {
                throw new Error('Unable to fetch posts');
            }
        }
        catch (error) {
            res.status(error.status || 400);
        }
    });
};
exports.findUsersPostController = findUsersPostController;
