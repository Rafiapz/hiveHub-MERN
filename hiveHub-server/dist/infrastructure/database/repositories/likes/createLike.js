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
exports.createLike = void 0;
const likesModel_1 = __importDefault(require("../../models/likesModel"));
const models_1 = require("../../models");
const createLike = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield likesModel_1.default.findOne({ postId: data.postId, userId: data.userId });
        if (likes) {
            const status = yield likesModel_1.default.deleteOne({ postId: data.postId, userId: data.userId });
            if (status.deletedCount !== 1) {
                throw new Error('Failed to unlike post');
            }
            const post = yield models_1.Posts.findOneAndUpdate({ _id: data.postId }, { $inc: { likes: -1 } }, { new: true }).populate('userId');
            return { post, unlike: true };
        }
        else {
            const newLike = yield likesModel_1.default.create(data);
            const post = yield models_1.Posts.findOneAndUpdate({ _id: newLike.postId }, { $inc: { likes: 1 } }, { new: true }).populate('userId');
            const posts = yield models_1.Posts.find({});
            const allLikes = yield likesModel_1.default.find({ postId: data.postId });
            return { posts, allLikes, post, liked: true };
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createLike = createLike;
