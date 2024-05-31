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
exports.createPollController = void 0;
const createPollController = (dependencies) => {
    const { pollsUseCases: { createPollUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const option = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.options);
            const options = option.map((ob, i) => {
                return {
                    option: ob,
                    votes: 0,
                    id: i
                };
            });
            const data = {
                userId: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId,
                question: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.question,
                options: options,
            };
            const poll = yield createPollUseCase(dependencies).execute(data);
            if (!poll) {
                throw new Error('Failed to create poll');
            }
            else {
                res.status(200).json({ status: 'ok', message: 'Successfully submitted poll', data: poll });
            }
        }
        catch (error) {
            console.log(error);
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.createPollController = createPollController;
