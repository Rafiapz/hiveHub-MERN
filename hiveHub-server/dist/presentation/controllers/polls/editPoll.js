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
exports.editPollController = void 0;
const editPollController = (dependencies) => {
    const { pollsUseCases: { updatePollUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const question = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.question;
            const options = JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.options);
            const _id = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c._id;
            const data = {
                _id,
                question,
                options,
            };
            const result = yield updatePollUseCase(dependencies).execute(data);
            res.status(200).json({ status: 'ok' });
        }
        catch (error) {
            console.log(error);
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.editPollController = editPollController;
