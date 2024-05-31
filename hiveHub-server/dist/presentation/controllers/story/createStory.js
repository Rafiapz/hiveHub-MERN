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
exports.createStoryController = void 0;
const createStoryController = (dependencies) => {
    const { storyUseCases: { createStoryUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const path = `https://hivehub.shop/posts/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
            const data = {
                userId: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId,
                media: [path],
                description: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.description
            };
            const story = yield createStoryUseCase(dependencies).execute(data);
            if (!story) {
                throw new Error('Failed to Post story');
            }
            else {
                res.status(200).json({ status: 'ok', data: story, message: 'Successfully posted your story' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(error.status || 500).json({ status: 'failed', message: error.message });
        }
    });
};
exports.createStoryController = createStoryController;
