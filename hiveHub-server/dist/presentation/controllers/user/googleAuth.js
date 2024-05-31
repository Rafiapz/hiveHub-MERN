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
exports.googleAuthController = void 0;
const jwt_1 = require("../../../_lib/jwt");
const axios_1 = __importDefault(require("axios"));
const googleAuthController = (dependencies) => {
    const { useCases: { findOneUserUseCase, createUserUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const googleAccessToken = req.body.googleAccesToken;
            if (googleAccessToken) {
                const response = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${googleAccessToken}`
                    }
                });
                const email = response.data.email;
                const existingUser = yield findOneUserUseCase(dependencies).execute({ email: email });
                if (existingUser) {
                    const token = (0, jwt_1.genereateToken)({ id: existingUser._id, email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email });
                    res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
                    res.json({ status: 'ok', userData: existingUser }).status(200);
                }
                else {
                    const googleData = response.data;
                    const userData = {
                        email: googleData.email,
                        isVerified: true,
                        createdAt: new Date(),
                        fullName: googleData.name,
                        isActive: true,
                        profilePhoto: googleData.picture,
                        password: googleData.sub
                    };
                    const newUser = yield createUserUseCase(dependencies).execute(userData);
                    if (newUser) {
                        const token = (0, jwt_1.genereateToken)({ id: newUser._id, email: newUser === null || newUser === void 0 ? void 0 : newUser.email });
                        res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
                        res.json({ status: 'ok', userData: newUser }).status(200);
                    }
                }
            }
            else {
                throw new Error('Unable to login with google');
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.googleAuthController = googleAuthController;
