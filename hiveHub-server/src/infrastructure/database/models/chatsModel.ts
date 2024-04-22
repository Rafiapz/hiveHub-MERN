
import mongoose, { Schema } from 'mongoose';
import { ChatsEntity } from '../../../domain/entities/chatsEntity';


const chatsSchema: Schema = new Schema({

    conversationId: { type: Schema.Types.ObjectId },
    senderId: { type: Schema.Types.ObjectId, required: true },
    message: { type: String },
    image: { type: String },
    video: { type: String }

}, { timestamps: true });

const Chats = mongoose.model<ChatsEntity>('Chats', chatsSchema);

export default Chats;