import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { CommentsLikesEntity } from '../../../domain/entities/commentsLIkesEntity';



const commentsLikesSchema: Schema = new Schema({
    commentId: { type: Schema.Types.ObjectId, required: true, ref: 'comments' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    postId: { type: Schema.Types.ObjectId, required: true }
});

const CommentsLikes = mongoose.model<CommentsLikesEntity>('CommentsLikes', commentsLikesSchema);

export default CommentsLikes;

