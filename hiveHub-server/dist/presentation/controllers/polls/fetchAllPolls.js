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
exports.fetchUserPolls = exports.fetchAllPollsController = void 0;
const pollsModel_1 = __importDefault(require("../../../infrastructure/database/models/pollsModel"));
const fetchAllPollsController = (dependencies) => {
    const { pollsUseCases: { fetchAllPollsUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const polls = yield fetchAllPollsUseCase(dependencies).execute();
            res.status(200).json({ status: 'ok', data: polls });
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.fetchAllPollsController = fetchAllPollsController;
const fetchUserPolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const polls = yield pollsModel_1.default.find({ userId: userId }).populate('userId');
        res.status(200).json({ status: 'ok', data: polls });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.fetchUserPolls = fetchUserPolls;
