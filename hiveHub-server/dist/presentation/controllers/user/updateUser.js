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
exports.updateOtpController = void 0;
const otp_1 = require("../../../_lib/otp");
const updateOtpController = (dependencies) => {
    const { useCases: { updateOneUserUseCase, createUserUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.query.email;
            if (email === undefined) {
                throw new Error('Something went wrong');
            }
            else {
                const otpDetails = (0, otp_1.generateOtp)(email);
                updateOneUserUseCase(dependencies).execute({ email: email }, { otp: otpDetails === null || otpDetails === void 0 ? void 0 : otpDetails.OTP, createdAt: otpDetails === null || otpDetails === void 0 ? void 0 : otpDetails.timestamp });
            }
            res.json({ status: 'ok', message: 'Successfully resent OTP' }).status(200);
        }
        catch (error) {
            console.log(error);
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.updateOtpController = updateOtpController;
