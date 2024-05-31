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
exports.pollVote = void 0;
const pollsModel_1 = __importDefault(require("../../models/pollsModel"));
const pollVote = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(data === null || data === void 0 ? void 0 : data.optionId);
        const poll = yield pollsModel_1.default.findOneAndUpdate({ _id: data === null || data === void 0 ? void 0 : data.pollId, "options.id": id }, { "$inc": { "options.$.votes": 1 }, $addToSet: { voters: data === null || data === void 0 ? void 0 : data.userId } }, { new: true });
        return poll;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.pollVote = pollVote;
