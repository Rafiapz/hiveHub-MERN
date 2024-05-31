"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUnblockUser = void 0;
const models_1 = require("../../models");
const blockUnblockUser = (userId, toStatus) => {
    try {
        const updated = models_1.User.findOneAndUpdate({ _id: userId }, { $set: { isBlocked: toStatus } }, { new: true });
        return updated;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.blockUnblockUser = blockUnblockUser;
