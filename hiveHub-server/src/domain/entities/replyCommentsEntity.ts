import { ObjectId } from 'mongoose';

export interface ReplyCommentsEntity {
    _id?: ObjectId;
    commentId: ObjectId;
    userId: ObjectId;
    content: String;
}