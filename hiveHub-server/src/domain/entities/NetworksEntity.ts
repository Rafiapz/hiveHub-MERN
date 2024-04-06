import { Document, ObjectId } from 'mongoose';

export interface NetworksEntity  {
    _id?: ObjectId;
    sourceUserId: ObjectId | null;
    targetUserId: ObjectId | null;
    status: String | null;
}