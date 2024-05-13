import { Document, ObjectId } from 'mongoose';

export interface PollsEntity {
    _id?: ObjectId;
    question: String;
    options: {}[];
    voters?: ObjectId[] | null;
    userId: ObjectId;
}
