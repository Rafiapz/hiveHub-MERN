import mongoose, { Schema, Document, ObjectId } from 'mongoose';


export interface RazorpayOrderEntity {
    userId: ObjectId;
    amount: Number;
    status: String;
    _id?: ObjectId;
}
