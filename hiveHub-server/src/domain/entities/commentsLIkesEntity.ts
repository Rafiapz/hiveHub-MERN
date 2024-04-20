import { Types } from 'mongoose';


export interface CommentsLikesEntity {
    _id?: Types.ObjectId;
    commentId: Types.ObjectId | null;
    userId: Types.ObjectId | null;
    postId: Types.ObjectId | null;
}