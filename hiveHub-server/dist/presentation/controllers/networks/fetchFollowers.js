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
exports.fetchFollowersController = void 0;
const fetchFollowersController = (dependencies) => {
    const { networkUseCases: { findFollowersUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const userId = user === null || user === void 0 ? void 0 : user.id;
            const followers = yield findFollowersUseCase(dependencies).execute(userId);
            res.status(200).json({ status: 'ok', data: followers });
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.fetchFollowersController = fetchFollowersController;
