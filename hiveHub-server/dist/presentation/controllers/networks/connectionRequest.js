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
exports.coneectionRequestController = void 0;
const coneectionRequestController = (dependencies, notificationDependencies) => {
    const { networkUseCases: { connectionRequestUseCase } } = dependencies;
    const { notificationsUseCases: { createNotificationUseCase } } = notificationDependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const sourceUserId = user === null || user === void 0 ? void 0 : user.id;
            const targetUserId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.target;
            const data = {
                sourceUserId: sourceUserId,
                targetUserId: targetUserId,
                status: 'following'
            };
            const createdData = yield connectionRequestUseCase(dependencies).execute(data);
            if (createdData) {
                const data = {
                    actionBy: sourceUserId,
                    actionOn: targetUserId,
                    type: 'started_following',
                    message: 'Started following you'
                };
                yield createNotificationUseCase(notificationDependencies).execute(data);
                res.status(200).json({ status: 'ok', message: `You are now following ${(_b = createdData === null || createdData === void 0 ? void 0 : createdData.targetUserId) === null || _b === void 0 ? void 0 : _b.fullName}`, data: { createdData } });
            }
            else {
                throw new Error('Unable to make request');
            }
        }
        catch (error) {
            res.status(error.status || 500).json({ status: 'ok', message: error.message });
        }
    });
};
exports.coneectionRequestController = coneectionRequestController;
