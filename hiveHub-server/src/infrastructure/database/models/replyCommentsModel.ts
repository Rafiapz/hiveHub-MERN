import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { ReplyCommentsEntity } from '../../../domain/entities/replyCommentsEntity';



const ReplyCommentsSchema: Schema = new Schema({
    CommentId: { type: Schema.Types.ObjectId, required: true },
    UserId: { type: Schema.Types.ObjectId, required: true },
    Content: { type: String, required: true },
}, { timestamps: true });

const ReplyComments = mongoose.model<ReplyCommentsEntity>('ReplyComments', ReplyCommentsSchema);

export default ReplyComments;

