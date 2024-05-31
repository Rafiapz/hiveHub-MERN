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
exports.createCommentController = void 0;
const createCommentController = (dependencies, notificationsDependencies) => {
    const { commentsUseCases: { createCommentUseCase } } = dependencies;
    const { notificationsUseCases: { createNotificationUseCase } } = notificationsDependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const userId = user === null || user === void 0 ? void 0 : user.id;
            const comment = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.comment;
            const createdAt = new Date();
            const postId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.postId;
            const newComment = yield createCommentUseCase(dependencies).execute({ userId, comment, postId, createdAt });
            if (newComment) {
                const data = {
                    actionBy: userId,
                    actionOn: (_c = newComment === null || newComment === void 0 ? void 0 : newComment.postId) === null || _c === void 0 ? void 0 : _c.userId,
                    message: `Commented on your post "${newComment === null || newComment === void 0 ? void 0 : newComment.comment}"`,
                    read: false,
                    type: 'comment'
                };
                if (((_d = newComment === null || newComment === void 0 ? void 0 : newComment.postId) === null || _d === void 0 ? void 0 : _d.userId) != userId) {
                    const notification = yield createNotificationUseCase(notificationsDependencies).execute(data);
                }
                res.json({ status: 'ok', data: newComment, message: 'successfully added comment' }).status(200);
            }
            else {
                throw new Error('Unable to submit comment');
            }
        }
        catch (error) {
            console.log(error.message);
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.createCommentController = createCommentController;
