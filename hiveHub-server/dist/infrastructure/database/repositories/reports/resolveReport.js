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
exports.resolveReport = void 0;
const models_1 = require("../../models");
const likesModel_1 = __importDefault(require("../../models/likesModel"));
const reportsModel_1 = __importDefault(require("../../models/reportsModel"));
const resolveReport = (reportId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteResult = yield models_1.Posts.deleteOne({ _id: postId });
        if (deleteResult.deletedCount === 1) {
            yield likesModel_1.default.deleteMany({ postId: postId });
            const report = yield reportsModel_1.default.findOneAndUpdate({ _id: reportId }, { $set: { status: 'Resolved' } }, { new: true });
            return report;
        }
        throw new Error('Something went wrong');
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.resolveReport = resolveReport;
