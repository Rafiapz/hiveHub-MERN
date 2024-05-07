import { Request, Response } from 'express'
import Razorpay from 'razorpay'
import RazorpayOrder from '../../../infrastructure/database/models/razorpayOrderModel';
import { RazorpayOrderEntity } from '../../../domain/entities/razorpayOrder';

export const createOrderController = () => {

    return async (req: Request, res: Response) => {

        try {

            const razorpay = new Razorpay({
                key_id: process.env.razorpay_Key_id || '',
                key_secret: process.env.razorpay_key_secret || '',
            });


            const data: RazorpayOrderEntity = {
                userId: req?.body?.userId,
                amount: req?.body?.amount,
                status: 'initiated',
            }

            const order = await RazorpayOrder.create(data)

            if (order) {
                const options = {
                    amount: req?.body?.amount || 69900,
                    currency: 'INR',
                    receipt: order?._id.toString(),
                    payment_capture: 1
                };

                const response = await razorpay.orders.create(options)


                res.status(200).json({
                    order_id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                })
            }


        } catch (error: any) {
            console.log(error);

            res.status(400).json({ status: 'failed', message: error?.message })
        }
    }
}