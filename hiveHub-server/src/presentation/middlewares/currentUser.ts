import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../_lib/jwt";

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = req?.cookies?.userToken;

        if (userToken) {
            const user: any = verifyToken(userToken);
            req.user = user;

            next();
        } else {
            throw new Error("Please login and try again");
        }
    } catch (error: any) {
        res.json({ status: "failed", message: error.message });
    }
};


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req?.cookies?.userToken

        if (token) {
            const user = verifyToken(token)

            if (user?.role === 'admin') {
                next()
            } else {
                throw new Error('Access denied: Admins only')
            }

        } else {
            throw new Error('Please login and try again')
        }
    } catch (error: any) {
        res.status(500).json({ status: 'failed', messag: error?.message })
    }
}
