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
exports.rejectReport = void 0;
const reportsModel_1 = __importDefault(require("../../models/reportsModel"));
const rejectReport = (reportId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield reportsModel_1.default.findByIdAndUpdate({ _id: reportId }, { $set: { status: 'Rejected' } }, { new: true });
        return report;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.rejectReport = rejectReport;
