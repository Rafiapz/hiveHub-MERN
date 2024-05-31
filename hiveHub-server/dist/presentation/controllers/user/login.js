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
exports.loginController = void 0;
const bcrypt_1 = require("../../../_lib/bcrypt");
const jwt_1 = require("../../../_lib/jwt");
const loginController = (dependencies) => {
    const { useCases: { findOneUserUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const user = yield findOneUserUseCase(dependencies).execute({ email: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            else {
                const status = yield (0, bcrypt_1.comparePassword)((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password, user === null || user === void 0 ? void 0 : user.password);
                if (status) {
                    const token = (0, jwt_1.genereateToken)({ id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role });
                    const userData = yield findOneUserUseCase(dependencies).execute({ email: user.email });
                    res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, });
                    res.status(200).json({ status: 'ok', message: 'success', userData });
                }
                else {
                    throw new Error('Invalid email or password');
                }
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.loginController = loginController;
