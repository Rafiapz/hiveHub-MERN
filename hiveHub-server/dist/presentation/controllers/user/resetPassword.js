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
exports.changePasswordController = exports.resetPasswordVerificationController = void 0;
const jwt_1 = require("../../../_lib/jwt");
const otp_1 = require("../../../_lib/otp");
const bcrypt_1 = require("../../../_lib/bcrypt");
const resetPasswordVerificationController = (dependencies) => {
    const { useCases: { findOneUserUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const email = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.email;
            const user = yield findOneUserUseCase(dependencies).execute({ email });
            if (!user) {
                throw new Error('Email id not found');
            }
            else {
                const token = (0, jwt_1.generateResetPasswordToken)({ id: user === null || user === void 0 ? void 0 : user._id });
                const sendEmail = yield (0, otp_1.sendVerificationEmail)(email, token);
                if (sendEmail.status === 'ok') {
                    res.status(200).json({ status: 'ok' });
                }
                else {
                    throw new Error('Unable to sent verification email');
                }
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.resetPasswordVerificationController = resetPasswordVerificationController;
const changePasswordController = (dependencies) => {
    const { useCases: { updateUserByIdUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token, password } = req === null || req === void 0 ? void 0 : req.body;
            const status = (0, jwt_1.verifyToken)(token);
            const userId = status.id;
            const hashPsw = yield (0, bcrypt_1.passwordHashing)(password);
            const user = yield updateUserByIdUseCase(dependencies).execute(userId, { password: hashPsw });
            if (!user) {
                throw new Error('Something went wrong please try again later');
            }
            else {
                const userToken = (0, jwt_1.genereateToken)({ id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email });
                res.cookie('userToken', userToken, { maxAge: 1000 * 60 * 60, httpOnly: true });
                res.status(200).json({ status: 'ok', message: 'Password changed successfully', userData: user });
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.changePasswordController = changePasswordController;
