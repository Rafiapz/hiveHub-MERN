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
exports.fetchOtherUserController = exports.fetchUserController = void 0;
const jwt_1 = require("../../../_lib/jwt");
const fetchUserController = (dependencies) => {
    const { useCases: { findOneUserByIdUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.cookies.userToken;
            if (token) {
                const authorized = (0, jwt_1.verifyToken)(token);
                if (authorized) {
                    const id = authorized.id;
                    let userData = yield findOneUserByIdUseCase(dependencies).execute(id);
                    res.json({ status: 'ok', userData });
                }
                else {
                    throw new Error('User not authorized');
                }
            }
            else {
                throw new Error("Please login and try again");
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.fetchUserController = fetchUserController;
const fetchOtherUserController = (dependencies) => {
    const { useCases: { findOneUserUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const email = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.email;
            if (typeof email === 'string') {
                const userData = yield findOneUserUseCase(dependencies).execute({ email });
                res.status(200).json({ status: 'ok', data: userData });
            }
            else {
                throw new Error('Something went wrong');
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.fetchOtherUserController = fetchOtherUserController;
