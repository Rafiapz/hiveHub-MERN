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
exports.deletePostController = void 0;
const s3_1 = require("../../../_lib/s3");
const deletePostController = (dependencies) => {
    const { postUseCases: { deletePostUseCase, findOneUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (typeof ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id) === 'string') {
                const id = req.query.id;
                console.log(id);
                const post = yield findOneUseCase(dependencies).execute(id);
                yield (0, s3_1.deleteFile)((_b = post === null || post === void 0 ? void 0 : post.media) === null || _b === void 0 ? void 0 : _b.path);
                const status = yield deletePostUseCase(dependencies).execute({ _id: id });
                if (status.deletedCount === 1) {
                    res.json({ status: 'ok', message: 'The post has been successfully deleted' }).status(200);
                }
                else {
                    throw new Error('Something went wrong unable to delete post');
                }
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message }).status(400);
        }
    });
};
exports.deletePostController = deletePostController;
