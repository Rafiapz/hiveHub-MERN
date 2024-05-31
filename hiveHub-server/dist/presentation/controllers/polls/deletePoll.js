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
exports.deletePollController = void 0;
const deletePollController = (dependencies) => {
    const { pollsUseCases: { deletePollUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.pollId;
            const result = yield deletePollUseCase(dependencies).execute(id);
            console.log(result);
            res.status(200).json({ status: 'ok', message: 'Deleted Succesfully' });
        }
        catch (error) {
            res.status(200).json({ status: 'ok', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.deletePollController = deletePollController;
