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
exports.createPostController = void 0;
const jwt_1 = require("../../../_lib/jwt");
const models_1 = require("../../../infrastructure/database/models");
const notifications_1 = __importDefault(require("../../../infrastructure/database/models/notifications"));
const s3_1 = require("../../../_lib/s3");
const createPostController = (dependencies) => {
    const { postUseCases: { createPostUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const path = (yield (0, s3_1.uploadToS3Bucket)(req.file)) || '';
            const token = req.cookies.userToken;
            if (token) {
                const decoded = (0, jwt_1.verifyToken)(token);
                if (decoded) {
                    const mediaType = req.params.type;
                    console.log(req.params);
                    const data = {
                        userId: decoded.id,
                        media: mediaType ? { type: mediaType, path: path } : undefined,
                        content: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.content,
                        likes: 0,
                        comments: 0,
                        shares: 0
                    };
                    const post = yield createPostUseCase(dependencies).execute(data);
                    if (post) {
                        const postedUser = yield models_1.User.findOne({ _id: decoded === null || decoded === void 0 ? void 0 : decoded.id });
                        if (postedUser === null || postedUser === void 0 ? void 0 : postedUser.premium) {
                            const allUserIds = yield models_1.User.find({ _id: { $ne: postedUser === null || postedUser === void 0 ? void 0 : postedUser._id } }, { _id: 1 });
                            allUserIds === null || allUserIds === void 0 ? void 0 : allUserIds.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                                const data = {
                                    actionBy: postedUser === null || postedUser === void 0 ? void 0 : postedUser._id,
                                    message: 'Posted new post',
                                    type: 'post',
                                    actionOn: id,
                                    read: false
                                };
                                yield notifications_1.default.create(data);
                            }));
                        }
                        res.json({ status: 'ok', postData: post, message: 'Your post has been successfully submitted!' });
                    }
                    else {
                        throw new Error('Failed to create post');
                    }
                }
            }
            else {
                throw new Error('Something went wrong');
            }
        }
        catch (error) {
            console.log(error);
            res.json({ status: 'failed', message: error.message }).status(500);
            //send proper error message
        }
    });
};
exports.createPostController = createPostController;
