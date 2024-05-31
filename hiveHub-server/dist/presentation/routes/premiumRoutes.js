"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.premiumRoutes = void 0;
const express_1 = require("express");
const createOrder_1 = require("../controllers/premium/createOrder");
const currentUser_1 = require("../middlewares/currentUser");
const premiumRoutes = () => {
    const router = (0, express_1.Router)();
    router.route('/order').post(currentUser_1.currentUser, (0, createOrder_1.createOrderController)());
    router.route('/order/validate').post(currentUser_1.currentUser, (0, createOrder_1.validateOrder)());
    router.route('/create-payment').post(currentUser_1.currentUser, (0, createOrder_1.paymentSuccess)());
    return router;
};
exports.premiumRoutes = premiumRoutes;
