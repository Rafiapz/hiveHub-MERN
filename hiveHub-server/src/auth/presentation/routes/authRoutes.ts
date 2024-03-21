import { Router } from 'express'
import { IDependencies } from '../../application/interfaces/IDependencies'
import { controllers } from '../controllers'
import passport from 'passport'




export const authRoutes = (dependencies: IDependencies) => {

    const { signup, verify, login, updateOtp, googleAuth, logout,fetchUser } = controllers(dependencies)



    const router = Router()

    router.use(passport.initialize())

    router.use(passport.session());

    router.route('/signup').post(signup)

    router.route('/otp-verification').post(verify)

    router.route('/login').post(login)

    router.route('/fetch-user').get(fetchUser)

    router.route('/resend-otp').get(updateOtp)

    router.route('/google').post(googleAuth)

    router.route('/logout').get(logout)

 



    router.get('/failure', (req, res) => {
        console.log('called failure');

        res.send('failure')
    })

    return router
}