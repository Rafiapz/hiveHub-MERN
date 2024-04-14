import mongoose, { Schema } from 'mongoose';
import { ConversationEntity } from '../../../domain/entities/conversationEntity';


const conversationSchema: Schema = new Schema({

    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],


}, { timestamps: true });

const conversation = mongoose.model<ConversationEntity>('conversation', conversationSchema);

export default conversation;