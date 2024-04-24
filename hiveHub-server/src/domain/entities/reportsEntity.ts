import { ObjectId } from 'mongoose';

export interface ReportsEntity {
    postId: ObjectId;
    userId: ObjectId;
    reason: String;
    _id?: ObjectId;
    status: String;

}
