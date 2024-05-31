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
exports.deleteStoryController = void 0;
const deleteStoryController = (dependencies) => {
    const { storyUseCases: { deleteStoryUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const storyId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.storyId;
            const image = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.image;
            const data = {
                storyId,
                image
            };
            const result = yield deleteStoryUseCase(dependencies).execute(data);
            res.status(200).json({ status: 'ok' });
        }
        catch (error) {
            console.log(error);
            res.status(error.status || 500).json({ status: 'failed', message: error.message });
        }
    });
};
exports.deleteStoryController = deleteStoryController;
