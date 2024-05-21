import { ObjectId } from 'mongoose'

interface connctions {

    connectionId: ObjectId;
    userId: ObjectId
}

export interface UserEntity {

    _id?: ObjectId
    fullName: string,
    profilePhoto?: string,
    coverPhoto?: string,
    email: string,
    password: string,
    role?: string,
    isActive: boolean
    isVerified: boolean
    connections?: connctions[],
    otp?: string,
    createdAt: Date,
    isBlocked?: boolean,
    premium?: boolean,
    blockedUsers?: ObjectId[];
}