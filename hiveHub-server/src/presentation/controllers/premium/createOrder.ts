import { Request, Response } from 'express'
import Razorpay from 'razorpay'
import RazorpayOrder from '../../../infrastructure/database/models/razorpayOrderModel';
import { RazorpayOrderEntity } from '../../../domain/entities/razorpayOrder';
import crypto from 'crypto'
import Payments from '../../../infrastructure/database/models/paymentsModel';
import { User } from '../../../infrastructure/database/models';
import cron from 'node-cron'

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

            if (error?.code == '11000') {
                console.log('caling in');

                res.status(500).json({ status: 'failed', message: 'Something went wrong please try after 10 minutes' })
            } else {
                res.status(400).json({ status: 'failed', message: error?.message })
            }


        }
    }
}

export const validateOrder = () => {

    return async (req: Request, res: Response) => {

        try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req?.body

            const sha = crypto.createHmac('sha256', process?.env?.razorpay_key_secret || '')

            sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

            const digest = sha.digest('hex')

            if (digest !== razorpay_signature) {
                res.status(400).json({ status: 'failed', message: 'Transaction is not legit!' })
                return
            } else {
                res.status(200).json(
                    { status: 'ok', message: 'Success', orderId: razorpay_order_id, paymentId: razorpay_payment_id })
            }

        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}

export const paymentSuccess = () => {

    return async (req: Request, res: Response) => {

        try {

            const { orderId, paymentId, userId, amount } = req?.body


            const payment = await Payments.create({ orderId, paymentId, userId, amount })

            if (!payment) {
                throw new Error('Failed to complete transaction')
            } else {

                await User.findOneAndUpdate({ _id: userId }, { $set: { premium: true } })
                res.status(200).json({ status: 'ok' })
            }

        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}

const task = cron.schedule('* * * * *', async () => {

    try {

        let tenMinutesAgo = new Date();
        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

        const razorpayOrder = await RazorpayOrder.find({
            createdAt: { $lt: tenMinutesAgo }
        });


        razorpayOrder.forEach(async (ob: any) => {
            await RazorpayOrder.deleteOne({ _id: ob?._id })

        })


    } catch (error) {
        console.log(error);

    }

});


task.start();