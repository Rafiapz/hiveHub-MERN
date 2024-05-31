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
exports.deleteStory = void 0;
const storyModel_1 = __importDefault(require("../../models/storyModel"));
const deleteStory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield storyModel_1.default.findOneAndUpdate({ _id: data === null || data === void 0 ? void 0 : data.storyId }, { $pull: { media: data === null || data === void 0 ? void 0 : data.image } }, { new: true });
        const length = (_a = result === null || result === void 0 ? void 0 : result.media) === null || _a === void 0 ? void 0 : _a.length;
        console.log(length);
        if (length !== undefined && length <= 0) {
            const deleted = yield storyModel_1.default.deleteOne({ _id: data === null || data === void 0 ? void 0 : data.storyId });
            console.log(deleted);
        }
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteStory = deleteStory;
