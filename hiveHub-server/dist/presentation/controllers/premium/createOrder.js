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
exports.paymentSuccess = exports.validateOrder = exports.createOrderController = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const razorpayOrderModel_1 = __importDefault(require("../../../infrastructure/database/models/razorpayOrderModel"));
const crypto_1 = __importDefault(require("crypto"));
const paymentsModel_1 = __importDefault(require("../../../infrastructure/database/models/paymentsModel"));
const models_1 = require("../../../infrastructure/database/models");
const node_cron_1 = __importDefault(require("node-cron"));
const createOrderController = () => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const razorpay = new razorpay_1.default({
                key_id: process.env.razorpay_Key_id || '',
                key_secret: process.env.razorpay_key_secret || '',
            });
            const data = {
                userId: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId,
                amount: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.amount,
                status: 'initiated',
            };
            const order = yield razorpayOrderModel_1.default.create(data);
            if (order) {
                const options = {
                    amount: ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.amount) || 69900,
                    currency: 'INR',
                    receipt: order === null || order === void 0 ? void 0 : order._id.toString(),
                    payment_capture: 1
                };
                const response = yield razorpay.orders.create(options);
                res.status(200).json({
                    order_id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                });
            }
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) == '11000') {
                console.log('caling in');
                res.status(500).json({ status: 'failed', message: 'Something went wrong please try after 10 minutes' });
            }
            else {
                res.status(400).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
            }
        }
    });
};
exports.createOrderController = createOrderController;
const validateOrder = () => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req === null || req === void 0 ? void 0 : req.body;
            const sha = crypto_1.default.createHmac('sha256', ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.razorpay_key_secret) || '');
            sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
            const digest = sha.digest('hex');
            if (digest !== razorpay_signature) {
                res.status(400).json({ status: 'failed', message: 'Transaction is not legit!' });
                return;
            }
            else {
                res.status(200).json({ status: 'ok', message: 'Success', orderId: razorpay_order_id, paymentId: razorpay_payment_id });
            }
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.validateOrder = validateOrder;
const paymentSuccess = () => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { orderId, paymentId, userId, amount } = req === null || req === void 0 ? void 0 : req.body;
            const payment = yield paymentsModel_1.default.create({ orderId, paymentId, userId, amount });
            if (!payment) {
                throw new Error('Failed to complete transaction');
            }
            else {
                yield models_1.User.findOneAndUpdate({ _id: userId }, { $set: { premium: true } });
                res.status(200).json({ status: 'ok' });
            }
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).json({ status: 'failed', message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
};
exports.paymentSuccess = paymentSuccess;
const task = node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tenMinutesAgo = new Date();
        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
        const razorpayOrder = yield razorpayOrderModel_1.default.find({
            createdAt: { $lt: tenMinutesAgo }
        });
        razorpayOrder.forEach((ob) => __awaiter(void 0, void 0, void 0, function* () {
            yield razorpayOrderModel_1.default.deleteOne({ _id: ob === null || ob === void 0 ? void 0 : ob._id });
        }));
    }
    catch (error) {
        console.log(error);
    }
}));
task.start();
