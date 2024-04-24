import mongoose, { Schema } from 'mongoose';
import { ReportsEntity } from '../../../domain/entities/reportsEntity';


const ReportsSchema: Schema = new Schema({
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Posts' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    reason: { type: String, required: true },
    status: { type: String }
}, { timestamps: true });

const Reports = mongoose.model<ReportsEntity>('Reports', ReportsSchema);

export default Reports;

