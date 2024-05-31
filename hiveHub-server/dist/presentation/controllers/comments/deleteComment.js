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
exports.deleteCommentController = void 0;
const deleteCommentController = (dependencies) => {
    const { commentsUseCases: { deleteCommentUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const commentId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.commentId;
            const status = yield deleteCommentUseCase(dependencies).execute(commentId);
            if (status.deletedCount === 1) {
                res.json({ status: 'ok', message: 'Comment succesfully deleted' }).status(200);
            }
            else {
                throw new Error('Unable to delete comment ');
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message }).status(400);
        }
    });
};
exports.deleteCommentController = deleteCommentController;
