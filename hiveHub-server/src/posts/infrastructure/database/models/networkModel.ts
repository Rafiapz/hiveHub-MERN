import mongoose, { Schema } from 'mongoose';
import { NetworksEntity } from '../../../domain/entities';



const NetworksSchema: Schema = new Schema({
    sourceUserId: { type: Schema.Types.ObjectId, required: true },
    targetUserId: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, required: true },
});

const Networks = mongoose.model<NetworksEntity>('Networks', NetworksSchema);

export default Networks;

