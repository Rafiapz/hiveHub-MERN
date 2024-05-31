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
exports.rejectReportController = void 0;
const rejectReportController = (dependencies) => {
    const { reportsUseCases: { rejectReportUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const reportId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            const updated = yield rejectReportUseCase(dependencies).execute(reportId);
            res.status(200).json({ status: 'ok', data: updated });
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.rejectReportController = rejectReportController;
