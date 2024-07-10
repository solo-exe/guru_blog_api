import { Request, Response, NextFunction } from "express";

import { Auth, Errors } from '../../services'
import { AuthenticatedRequest } from "src/types";


export const register = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { email, password, first_name, last_name, } = req.body
        const { success, message, data, status } = await new Auth().register(first_name, last_name, email, password)
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}

export const login = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const { success, message, data, status } = await new Auth().login(email, password)
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}

export const deleteAccount = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new Errors.Unauthorized('Unauthorized')
        const { password } = req.body
        const { success, message, data, status } = await new Auth(req.user).deleteAccount(password)
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}
