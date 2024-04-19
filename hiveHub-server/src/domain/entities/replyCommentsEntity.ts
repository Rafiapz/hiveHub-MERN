import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ReplyCommentsEntity extends Document {
    _id: ObjectId;
    CommentId: ObjectId;
    UserId: ObjectId;
    Content: String;
}