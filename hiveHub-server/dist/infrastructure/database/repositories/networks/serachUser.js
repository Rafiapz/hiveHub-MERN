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
exports.searchUser = void 0;
const models_1 = require("../../models");
const searchUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regx = new RegExp(`^${query}`, "i");
        const users = yield models_1.User.find({ fullName: { $regex: regx } });
        return users;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.searchUser = searchUser;
