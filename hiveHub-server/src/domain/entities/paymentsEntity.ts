import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface PaymentsEntity {
    userId: ObjectId;
    orderId: string;
    paymentId: string;
    amount: Number;
    _id?: ObjectId;
}
