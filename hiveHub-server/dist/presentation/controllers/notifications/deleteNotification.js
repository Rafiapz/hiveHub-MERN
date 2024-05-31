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
exports.deleteNotificationController = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const notifications_1 = __importDefault(require("../../../infrastructure/database/models/notifications"));
const deleteNotificationController = (dependencies) => {
    const { notificationsUseCases: { deleteNotificationUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield deleteNotificationUseCase(dependencies).execute(id);
            if ((result === null || result === void 0 ? void 0 : result.deletedCount) === 1) {
                res.status(200).json({ status: 'ok' });
            }
            else {
                throw new Error('Failed to delete');
            }
        }
        catch (error) {
            console.log(error);
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.deleteNotificationController = deleteNotificationController;
const task = node_cron_1.default.schedule('0 */10 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 1);
        const notifications = yield notifications_1.default.find({
            createdAt: { $lt: sevenDaysAgo }
        });
        notifications.forEach((ob) => __awaiter(void 0, void 0, void 0, function* () {
            yield notifications_1.default.deleteOne({ _id: ob === null || ob === void 0 ? void 0 : ob._id });
        }));
    }
    catch (error) {
        console.log(error);
    }
}));
task.start();
