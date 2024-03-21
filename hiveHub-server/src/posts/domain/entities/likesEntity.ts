import { ObjectId } from 'mongoose';


export interface LikesEntity  {
    _id?: ObjectId;
    postId: ObjectId | null;
    userId: ObjectId | null;
  }