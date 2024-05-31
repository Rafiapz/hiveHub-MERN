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
exports.fetchAllposts = void 0;
const s3_1 = require("../../../_lib/s3");
const fetchAllposts = (dependencies) => {
    const { postUseCases: { findAllPostsUseCase }, } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const userId = user === null || user === void 0 ? void 0 : user.id;
            const pageSize = 2;
            const pageNumber = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page;
            const skip = (pageNumber - 1) * pageSize;
            const limit = pageSize;
            const data = {
                userId,
                skip,
                limit,
            };
            const { posts, likes } = yield findAllPostsUseCase(dependencies).execute(data);
            for (let post of posts) {
                post.media.path = yield (0, s3_1.getObjectSignedUrl)((_b = post === null || post === void 0 ? void 0 : post.media) === null || _b === void 0 ? void 0 : _b.path);
                post.userId.profilePhoto = yield (0, s3_1.getObjectSignedUrl)((_c = post === null || post === void 0 ? void 0 : post.userId) === null || _c === void 0 ? void 0 : _c.profilePhoto);
            }
            res.status(200).json({ status: "ok", message: "success", data: { posts, likes } });
        }
        catch (error) {
            console.log(error);
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: "failed", message: error.message });
        }
    });
};
exports.fetchAllposts = fetchAllposts;
