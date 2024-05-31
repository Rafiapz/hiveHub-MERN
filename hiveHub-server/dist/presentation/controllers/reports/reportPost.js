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
exports.reportPostController = void 0;
const reportPostController = (dependencies) => {
    const { reportsUseCases: { createReportUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const userId = user === null || user === void 0 ? void 0 : user.id;
            const data = {
                postId: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.postId,
                userId: userId,
                reason: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.reason,
                status: 'Pending'
            };
            const result = yield createReportUseCase(dependencies).execute(data);
            if (!result) {
                throw new Error('Unable to report the post');
            }
            else {
                res.status(200).json({ status: 'ok', data: result });
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.reportPostController = reportPostController;
