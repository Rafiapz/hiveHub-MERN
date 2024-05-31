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
exports.isUserBlockedController = exports.unblockOtherUserController = exports.blockOtherUserController = void 0;
const models_1 = require("../../../infrastructure/database/models");
const blockOtherUserController = (dependencies) => {
    const { useCases: { blockUserByUserUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId;
            const targetUserId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.targetUserId;
            const data = {
                userId,
                targetUserId
            };
            const result = yield blockUserByUserUseCase(dependencies).execute(data);
            res.status(200).json({ status: 'ok', message: 'Successfully blocked' });
        }
        catch (error) {
            res.status(error.status || 500).json({ status: 'failed', messag: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.blockOtherUserController = blockOtherUserController;
const unblockOtherUserController = (dependencies) => {
    const { useCases: { unblockUserByUserUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId;
            const targetUserId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.targetUserId;
            const data = {
                userId,
                targetUserId
            };
            const result = yield unblockUserByUserUseCase(dependencies).execute(data);
            res.status(200).json({ status: 'ok', message: 'Successfully unblocked' });
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong' });
        }
    });
};
exports.unblockOtherUserController = unblockOtherUserController;
const isUserBlockedController = (dependencies) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            const target = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.target;
            const user = yield models_1.User.findOne({ _id: userId });
            const blockedUsers = user === null || user === void 0 ? void 0 : user.blockedUsers;
            if (blockedUsers === null || blockedUsers === void 0 ? void 0 : blockedUsers.includes(target)) {
                res.status(200).json({ status: 'ok', data: 'blockedByMe' });
                return;
            }
            else {
                const hisDocument = yield models_1.User.findOne({ _id: target });
                const hisBlocked = hisDocument === null || hisDocument === void 0 ? void 0 : hisDocument.blockedUsers;
                if (hisBlocked === null || hisBlocked === void 0 ? void 0 : hisBlocked.includes(userId)) {
                    res.status(200).json({ status: 'ok', data: 'blockedByHim' });
                    return;
                }
                else {
                    res.status(200).json({ status: 'ok', data: 'notBlocked' });
                    return;
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ status: 'failed' });
        }
    });
};
exports.isUserBlockedController = isUserBlockedController;
