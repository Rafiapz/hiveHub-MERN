"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.currentUser = void 0;
const jwt_1 = require("../../_lib/jwt");
const currentUser = (req, res, next) => {
    var _a;
    try {
        const userToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.userToken;
        if (userToken) {
            const user = (0, jwt_1.verifyToken)(userToken);
            req.user = user;
            next();
        }
        else {
            throw new Error("Please login and try again");
        }
    }
    catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};
exports.currentUser = currentUser;
const isAdmin = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.userToken;
        if (token) {
            const user = (0, jwt_1.verifyToken)(token);
            if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
                next();
            }
            else {
                throw new Error('Access denied: Admins only');
            }
        }
        else {
            throw new Error('Please login and try again');
        }
    }
    catch (error) {
        res.status(500).json({ status: 'failed', messag: error === null || error === void 0 ? void 0 : error.message });
    }
};
exports.isAdmin = isAdmin;
