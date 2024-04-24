import { ObjectId } from 'mongoose';


export interface StoryEntity {
    _id?: ObjectId;
    userId: ObjectId;
    media: String[] | null;
    description?: String | null;
    seenBy?: ObjectId[] | null

}