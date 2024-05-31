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
exports.verifyController = void 0;
const jwt_1 = require("../../../_lib/jwt");
const verifyController = (dependencies) => {
    const { useCases: { verifyUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data.email || !data.otp) {
                throw new Error('verification failed');
            }
            const user = yield verifyUserUseCase(dependencies).execute(data);
            if (user) {
                const token = (0, jwt_1.genereateToken)({ id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email });
                res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
                res.json({ status: 'ok', message: "You have successfully verified you account", userData: user }).status(200);
            }
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message }).status(400);
        }
    });
};
exports.verifyController = verifyController;
