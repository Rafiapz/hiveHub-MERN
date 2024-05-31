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
exports.findAllNotifications = void 0;
const notifications_1 = __importDefault(require("../../models/notifications"));
const findAllNotifications = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // return await Notifications.find({ actionOn: data?.userId }).sort({ createdAt: -1 }).skip(data?.skip).limit(data?.limit).populate('actionBy')
        return yield notifications_1.default.find({ actionOn: data === null || data === void 0 ? void 0 : data.userId }).sort({ createdAt: -1 }).populate('actionBy');
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findAllNotifications = findAllNotifications;
