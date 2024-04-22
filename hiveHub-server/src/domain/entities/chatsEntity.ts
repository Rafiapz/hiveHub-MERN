
import { ObjectId } from 'mongoose';

export interface ChatsEntity {
    _id?: ObjectId;
    message: string;
    senderId: ObjectId;
    conversationId: ObjectId;
    image?: string,
    video?: string

}