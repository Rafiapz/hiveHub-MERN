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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePostController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const likePostController = (dependencies, notificationsDependencies) => {
    const { likesUseCases: { likePostUseCase, } } = dependencies;
    const { notificationsUseCases: { createNotificationUseCase } } = notificationsDependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const userIdData = user === null || user === void 0 ? void 0 : user.id;
            const userId = new mongoose_1.default.Types.ObjectId(userIdData);
            const postIdData = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.postId;
            const postId = new mongoose_1.default.Types.ObjectId(postIdData);
            const likeData = { postId: postId, userId: userId };
            const { posts, likes, post, liked, unlike } = yield likePostUseCase(dependencies).execute(likeData);
            if (liked && post) {
                const data = {
                    actionBy: userIdData,
                    actionOn: (_b = post === null || post === void 0 ? void 0 : post.userId) === null || _b === void 0 ? void 0 : _b._id,
                    message: 'Liked your post',
                    read: false,
                    type: 'like'
                };
                if (((_c = post === null || post === void 0 ? void 0 : post.userId) === null || _c === void 0 ? void 0 : _c._id) != userIdData) {
                    yield createNotificationUseCase(notificationsDependencies).execute(data);
                }
                res.status(200).json({ status: 'ok', message: 'Succesfully liked post', post });
            }
            else if (unlike) {
                res.status(200).json({ status: 'ok', message: 'Successfully unlike post', post });
            }
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'Failed', message: error.message });
        }
    });
};
exports.likePostController = likePostController;
