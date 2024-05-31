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
exports.createReplyCommentController = void 0;
const createReplyCommentController = (dependencies) => {
    const { commentsUseCases: { createReplyCommentUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const data = {
                commentId: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.commentId,
                content: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.content,
                userId: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId
            };
            const reply = yield createReplyCommentUseCase(dependencies).execute(data);
            if (!reply) {
                throw new Error('Unable to submit reply');
            }
            else {
                res.status(200).json({ status: 'ok', message: 'Reply submitted successfully', data: reply });
            }
        }
        catch (error) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message });
        }
    });
};
exports.createReplyCommentController = createReplyCommentController;
