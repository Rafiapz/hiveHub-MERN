import { Router } from 'express'
import { createOrderController, paymentSuccess, validateOrder } from '../controllers/premium/createOrder'
import { currentUser } from '../middlewares/currentUser'




export const premiumRoutes = () => {


    const router = Router()

    router.route('/order').post(currentUser, createOrderController())

    router.route('/order/validate').post(currentUser, validateOrder())

    router.route('/create-payment').post(currentUser, paymentSuccess())

    return router
}