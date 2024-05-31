"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.isAuthorized = void 0;
const jwt_1 = require("../../../_lib/jwt");
const isAuthorized = (req, res) => {
    try {
        const token = req.cookies.userToken;
        if (token) {
            const authorized = (0, jwt_1.verifyToken)(token);
            if (authorized) {
                res.json({ status: 'ok', message: 'authorized' }).status(200);
            }
            else {
                res.json({ status: 'falied' }).status(403);
            }
        }
    }
    catch (error) {
        console.log(error.message);
        res.json({ status: 'failed', message: error.message }).status(500);
    }
};
exports.isAuthorized = isAuthorized;
const auth = (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if (token) {
            const authorized = (0, jwt_1.verifyToken)(token);
            if (authorized) {
                next();
            }
            else {
                res.json({ status: 'falied' }).status(200);
            }
        }
    }
    catch (error) {
        res.json({ status: 'failed', message: error.message });
    }
};
exports.auth = auth;
