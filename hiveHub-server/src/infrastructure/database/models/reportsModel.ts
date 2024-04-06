import mongoose, { Schema } from 'mongoose';
import { ReportsEntity } from '../../../domain/entities/reportsEntity';


const ReportsSchema: Schema = new Schema({
    postId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

const Reports = mongoose.model<ReportsEntity>('Reports', ReportsSchema);

export default Reports;

