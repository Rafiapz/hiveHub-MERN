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
exports.editUserEmailController = exports.editUserProfile = void 0;
const bcrypt_1 = require("../../../_lib/bcrypt");
const otp_1 = require("../../../_lib/otp");
const user_1 = require("../../../application/useCase/user");
const editUserProfile = (dependencies) => {
    const { useCases: { updateUserByIdUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const id = user === null || user === void 0 ? void 0 : user.id;
            let data = {};
            data = req === null || req === void 0 ? void 0 : req.body;
            if (req === null || req === void 0 ? void 0 : req.query.coverPhoto) {
                data.coverPhoto = `https://hivehub.shop/posts/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
            }
            else if ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.profilePhoto) {
                data.profilePhoto = `https://hivehub.shop/posts/${(_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.filename}`;
            }
            if (data === null || data === void 0 ? void 0 : data.password) {
                data.password = yield (0, bcrypt_1.passwordHashing)(data.password);
            }
            if (data === null || data === void 0 ? void 0 : data.email) {
                const otpDetails = (0, otp_1.generateOtp)(data === null || data === void 0 ? void 0 : data.email);
                if (!otpDetails) {
                    throw new Error('Unable to sent verification email');
                }
                else {
                    yield updateUserByIdUseCase(dependencies).execute(id, { otp: otpDetails === null || otpDetails === void 0 ? void 0 : otpDetails.OTP });
                    res.status(200).json({ status: 'ok', message: 'Successfully sent OTP to new email' });
                    return;
                }
            }
            const userData = yield updateUserByIdUseCase(dependencies).execute(id, data);
            if (!userData) {
                throw new Error('Unable to update profile');
            }
            console.log(userData);
            res.status(200).json({ status: 'ok', data: userData, message: 'Profile updated' });
        }
        catch (error) {
            console.log(error);
            res.status(error.status || 400).json({ status: 'failed', message: error.message });
        }
    });
};
exports.editUserProfile = editUserProfile;
const editUserEmailController = (dependencies) => {
    const { useCases: { updateUserByIdUseCase }, } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const user = req === null || req === void 0 ? void 0 : req.user;
            const id = user === null || user === void 0 ? void 0 : user.id;
            const verifyData = {
                email: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.oldEmail,
                otp: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.otp,
            };
            const result = yield (0, user_1.verifyUserUseCase)(dependencies).execute(verifyData);
            if (!result) {
                throw new Error("Invalid OTP");
            }
            const data = {
                email: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.newEmail,
            };
            const userData = yield updateUserByIdUseCase(dependencies).execute(id, data);
            if (!userData) {
                throw new Error("Unable to update profile");
            }
            res.status(200).json({ status: "ok", message: "Successfully update email", data: userData });
        }
        catch (error) {
            console.log(error);
            res.status(error.status || 500).json({ status: "failed", message: error.message });
        }
    });
};
exports.editUserEmailController = editUserEmailController;
