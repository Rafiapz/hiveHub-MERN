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
exports.comparePassword = exports.validatePassword = exports.passwordHashing = void 0;
const bcrypt_1 = require("bcrypt");
const passwordHashing = (psw) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield (0, bcrypt_1.genSalt)(10);
        const hashPwd = yield (0, bcrypt_1.hash)(psw, salt);
        if (!hashPwd) {
            throw new Error('Password hashing error');
        }
        return hashPwd;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.passwordHashing = passwordHashing;
const validatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const status = yield (0, exports.comparePassword)((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.oldPassword, (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.ogOldPassword);
        if (status) {
            next();
        }
        else {
            res.status(200).json({ status: 'invalid', error: 'incorrect old password' });
        }
    }
    catch (error) {
        res.status(error.status || 400);
    }
});
exports.validatePassword = validatePassword;
const comparePassword = (reqPsw, ogPsw) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, bcrypt_1.compare)(reqPsw, ogPsw);
        return status;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.comparePassword = comparePassword;
