"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const blockUnblockUser_1 = require("./blockUnblockUser");
const findAllUsers_1 = require("./findAllUsers");
const controllers = (dependencies) => {
    return {
        findAllUsers: (0, findAllUsers_1.findAllUsersController)(dependencies),
        blockUnblockUser: (0, blockUnblockUser_1.blockUnblockUser)(dependencies)
    };
};
exports.controllers = controllers;
