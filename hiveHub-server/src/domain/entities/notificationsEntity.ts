import { ObjectId } from 'mongoose';

export interface NotificationsEntity {
    _id?: ObjectId;
    type: String;
    actionBy: ObjectId;
    actionOn: ObjectId;
    message: String
    read?: Boolean | null;
}