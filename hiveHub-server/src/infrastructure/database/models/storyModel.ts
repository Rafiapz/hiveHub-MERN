import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { StoryEntity } from '../../../domain/entities/storyEntity';



const StorySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    media: [{ type: String, }],
    description: { type: String },
    seenBy: [{ type: Schema.Types.ObjectId, }]
}, { timestamps: true });

const Story = mongoose.model<StoryEntity>('Story', StorySchema);

export default Story;

