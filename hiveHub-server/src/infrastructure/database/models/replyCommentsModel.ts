import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { ReplyCommentsEntity } from '../../../domain/entities/replyCommentsEntity';



const ReplyCommentsSchema: Schema = new Schema({
    commentId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    content: { type: String, required: true },
}, { timestamps: true });

const ReplyComments = mongoose.model<ReplyCommentsEntity>('ReplyComments', ReplyCommentsSchema);

export default ReplyComments;

