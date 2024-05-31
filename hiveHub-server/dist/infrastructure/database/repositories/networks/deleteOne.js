"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = void 0;
const networkModel_1 = __importDefault(require("../../models/networkModel"));
const deleteOne = (id) => {
    try {
        const status = networkModel_1.default.deleteOne({ _id: id });
        return status;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.deleteOne = deleteOne;
