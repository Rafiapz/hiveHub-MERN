import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface PaymentsEntity {
    userId: ObjectId;
    amount: Number;
    _id?: ObjectId;
}
