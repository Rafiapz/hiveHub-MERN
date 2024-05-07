import mongoose, { Schema } from 'mongoose';
import { NotificationsEntity } from '../../../domain/entities/notificationsEntity';

const NotificationsSchema: Schema = new Schema({
    type: { type: String, required: true },
    actionBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    actionOn: { type: Schema.Types.ObjectId, required: true },
    message: { type: String },
    read: { type: Boolean },
}, { timestamps: true });

const Notifications = mongoose.model<NotificationsEntity>('Notifications', NotificationsSchema);

export default Notifications;

