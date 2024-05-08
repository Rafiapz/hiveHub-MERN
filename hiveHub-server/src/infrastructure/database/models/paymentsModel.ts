import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { PaymentsEntity } from '../../../domain/entities/paymentsEntity';


const PaymentsSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    orderId: { type: String, required: true }
}, { timestamps: true });

const Payments = mongoose.model<PaymentsEntity>('Payments', PaymentsSchema);

export default Payments;

