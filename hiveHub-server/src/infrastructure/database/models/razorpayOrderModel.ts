import mongoose, { Schema } from 'mongoose';
import { RazorpayOrderEntity } from '../../../domain/entities/razorpayOrder';


const RazorpayOrderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
});

const RazorpayOrder = mongoose.model<RazorpayOrderEntity>('RazorpayOrder', RazorpayOrderSchema);

export default RazorpayOrder;

