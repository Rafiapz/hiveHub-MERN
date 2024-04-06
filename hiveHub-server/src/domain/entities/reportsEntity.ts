import { ObjectId } from 'mongoose';

export interface ReportsEntity {
    postId: ObjectId;
    userId: ObjectId;
    reason: String;
    createdAt: Date;
    _id?: ObjectId;
}
