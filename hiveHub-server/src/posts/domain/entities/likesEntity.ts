import { Types } from 'mongoose';


export interface LikesEntity  {
    _id?: Types.ObjectId;
    postId: Types.ObjectId | null;
    userId: Types.ObjectId| null;
  }