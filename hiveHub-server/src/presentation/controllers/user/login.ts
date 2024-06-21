import { comparePassword } from "../../../_lib/bcrypt";
import { genereateToken } from "../../../_lib/jwt";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Request, Response, NextFunction } from 'express'


export const loginController = (dependencies: IDependencies) => {

  const { useCases: { findOneUserUseCase } } = dependencies

  return async (req: Request, res: Response) => {
    try {


      const user = await findOneUserUseCase(dependencies).execute({ email: req?.body?.email })

      if (!user) {
        throw new Error('Invalid email or password')

      } else {

        const status = await comparePassword(req?.body?.password, user?.password)

        if (status) {
          const token = genereateToken({ id: user?._id, email: user?.email, role: user?.role })
          const userData = await findOneUserUseCase(dependencies).execute({ email: user.email })

          res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "none", secure: true })
          res.status(200).json({ status: 'ok', message: 'success', userData })
        } else {

          throw new Error('Invalid email or password')

        }
      }


    } catch (error: any) {
      res.json({ status: 'failed', message: error.message })
    }
  }

}