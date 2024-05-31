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
exports.commentLike = void 0;
const commentsLikesModel_1 = __importDefault(require("../../models/commentsLikesModel"));
const commentsModel_1 = __importDefault(require("../../models/commentsModel"));
const commentLike = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield commentsLikesModel_1.default.findOne({ commentId: data === null || data === void 0 ? void 0 : data.commentId, userId: data === null || data === void 0 ? void 0 : data.userId });
        if (likes) {
            const status = yield commentsLikesModel_1.default.deleteOne({ commentId: data === null || data === void 0 ? void 0 : data.commentId, userId: data.userId });
            if (status.deletedCount !== 1) {
                throw new Error('Failed to unlike comment');
            }
            yield commentsModel_1.default.updateOne({ _id: data === null || data === void 0 ? void 0 : data.commentId }, { $inc: { likes: -1 } });
            return null;
        }
        else {
            const newLike = yield commentsLikesModel_1.default.create(data);
            yield commentsModel_1.default.findOneAndUpdate({ _id: newLike === null || newLike === void 0 ? void 0 : newLike.commentId }, { $inc: { likes: 1 } }, { new: true }).populate('userId');
            const comments = yield commentsModel_1.default.find({});
            const allLikes = yield commentsLikesModel_1.default.find({ commentId: data === null || data === void 0 ? void 0 : data.commentId });
            return { comments, allLikes };
        }
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.commentLike = commentLike;
