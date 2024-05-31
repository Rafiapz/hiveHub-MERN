"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    coverPhoto: { type: String },
    profilePhoto: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    isVerified: { type: Boolean, required: true },
    connections: [{
            ConnectionId: { type: mongoose_1.Schema.Types.ObjectId },
            UserId: { type: mongoose_1.Schema.Types.ObjectId },
        }],
    isActive: { type: Boolean, required: true },
    otp: { type: String },
    createdAt: { type: Date },
    isBlocked: { type: Boolean },
    premium: { type: Boolean },
    blockedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
});
exports.User = (0, mongoose_1.model)('users', userSchema);
