import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { ILikes } from '../../../domain/entities/likeEntity';



const LikesSchema: Schema = new Schema({
  PostId: { type: Schema.Types.ObjectId ,required: true,},
  UserId: { type: Schema.Types.ObjectId,required: true, },
});

const Likes = mongoose.model<ILikes>('Likes', LikesSchema);

export default Likes;

