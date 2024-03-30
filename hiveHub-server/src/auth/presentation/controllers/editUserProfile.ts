import { passwordHashing } from "../../../_lib/bcrypt";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { Request, Response } from 'express'

export const editUserProfile = (dependencies: IDependencies) => {

    const { useCases: { updateUserByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const user = req?.user
            const id = (user as any)?.id;
            let data: any = {}
            data = req?.body


            if (req?.query.coverPhoto) {

                data.coverPhoto = `http://localhost:7700/posts/${req?.file?.filename}`
            } else if (req?.query?.profilePhoto) {
                data.profilePhoto = `http://localhost:7700/posts/${req?.file?.filename}`
            }
            if (data?.password) {

                data.password = await passwordHashing(data.password)
            }


            const userData = await updateUserByIdUseCase(dependencies).execute(id, data)

            res.status(200).json({ status: 'ok', data: userData, message: 'Profile updated' })



        } catch (error: any) {
            res.status(error.status || 400).json({ status: 'failed', message: error.message })
        }
    }
}