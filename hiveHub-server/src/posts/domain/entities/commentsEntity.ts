import{ ObjectId } from 'mongoose';

export interface CommentsEntity  {
    _id: ObjectId;
    userId: ObjectId;
    comment: String;
    postId: ObjectId;
    createdAt:Date    
  }