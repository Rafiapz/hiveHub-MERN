import { comparePassword } from "../../../_lib/bcrypt";
import { genereateToken } from "../../../_lib/jwt";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { Request, Response, NextFunction } from 'express'


export const loginController = (dependencies: IDependencies) => {

  const { useCases: { findOneUserUseCase } } = dependencies

  return async (req: Request, res: Response) => {
    try {


      const user = await findOneUserUseCase(dependencies).execute({ email: req?.body?.email })

      if (!user) {
        throw new Error('Invalid email or password')

      } else {
        console.log(req?.body?.password);

        const status = await comparePassword(req?.body?.password, user?.password)

        if (status) {
          const token = genereateToken({ id: user?._id, email: user?.email })
          const userData = await findOneUserUseCase(dependencies).execute({ email: user.email })
          res.cookie('userToken', token, { maxAge: 1000 * 60 * 60, httpOnly: true })
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