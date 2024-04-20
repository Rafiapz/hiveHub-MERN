import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { CommentsEntity } from '../../../domain/entities/commentsEntity';

const CommentsSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  comment: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, required: true },
  likes: { type: Number }
});

const Comments = mongoose.model<CommentsEntity>('Comments', CommentsSchema);

export default Comments;