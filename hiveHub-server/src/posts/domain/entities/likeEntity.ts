import { ObjectId } from 'mongoose';


export interface ILikes  {
    _id: ObjectId;
    PostId: ObjectId | null;
    UserId: ObjectId | null;
  }