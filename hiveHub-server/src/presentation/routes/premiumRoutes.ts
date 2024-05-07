import { Router } from 'express'
import { createOrderController } from '../controllers/premium/createOrder'




export const premiumRoutes = () => {


    const router = Router()

    router.route('/order').post(createOrderController())



    router.route('/order/validate').post((req, res) => {

    })


    return router
}