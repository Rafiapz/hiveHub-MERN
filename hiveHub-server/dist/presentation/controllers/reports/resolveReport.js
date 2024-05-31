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
exports.resolveReportController = void 0;
const resolveReportController = (dependencies) => {
    const { reportsUseCases: { resolveReportUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const reportId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            const postId = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.postId;
            const report = yield resolveReportUseCase(dependencies).execute(reportId, postId);
            res.status(200).json({ status: 'ok', data: report });
        }
        catch (error) {
            console.log(error);
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.resolveReportController = resolveReportController;