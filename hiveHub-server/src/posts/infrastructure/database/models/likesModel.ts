import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { LikesEntity } from '../../../domain/entities/likesEntity';



const LikesSchema: Schema = new Schema({
  postId: { type: Schema.Types.ObjectId ,required: true,},
  userId: { type: Schema.Types.ObjectId,required: true, },
});

const Likes = mongoose.model<LikesEntity>('Likes', LikesSchema);

export default Likes;

