import mongoose, { Schema } from 'mongoose';
import { PollsEntity } from '../../../domain/entities/pollsEntity';


const PollsSchema: Schema = new Schema({
    question: { type: String, required: true },
    options: [{}],
    voters: [{ type: Schema.Types.ObjectId, }],
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' }
}, { timestamps: true });

const Polls = mongoose.model<PollsEntity>('Polls', PollsSchema);

export default Polls;

