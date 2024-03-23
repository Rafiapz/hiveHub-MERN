import { IDependencies } from "../../application/interfaces/IDependencies";
import { Request, Response } from "express";

export const logoutController = () => {

    return async (req: Request, res: Response) => {

        try {

                  
            res.cookie('userToken', '', { maxAge: 1 })
            res.json({status:'ok',message:'logout successfull'}).status(200)

        } catch (error:any) {

            res.json({status:'failed'})

        }
    }
}