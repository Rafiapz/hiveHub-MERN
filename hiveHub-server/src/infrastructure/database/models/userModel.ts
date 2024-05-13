import { Schema, model } from 'mongoose'
import { UserEntity } from '../../../domain/entities/userEntity'

const userSchema = new Schema({

    fullName: { type: String, required: true },
    coverPhoto: { type: String },
    profilePhoto: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    isVerified: { type: Boolean, required: true },
    connections: [{
        ConnectionId: { type: Schema.Types.ObjectId },
        UserId: { type: Schema.Types.ObjectId },
    }],
    isActive: { type: Boolean, required: true },
    otp: { type: String },
    createdAt: { type: Date },
    isBlocked: { type: Boolean },
    premium: { type: Boolean },
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

export const User = model<UserEntity>('users', userSchema)