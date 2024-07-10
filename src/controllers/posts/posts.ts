import { Request, Response, NextFunction } from "express";

import { Post, Errors } from '../../services'
import { AuthenticatedRequest } from "src/types";


export const createPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { title, body } = req.body
        if (!req.user) throw new Errors.Unauthorized('Unauthorized')
        const { success, message, data, status } = await new Post(req.user).createPost(title, body)
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}

export const getFeedPosts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new Errors.Unauthorized('Unauthorized')
        const { email, password } = req.body
        const { success, message, data, status } = await new Post(req.user).getFeedPosts()
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}

export const getPosts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new Errors.Unauthorized('Unauthorized')
        const { email, password } = req.body
        const { success, message, data, status } = await new Post(req.user).getUserPosts()
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}

export const getPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new Errors.Unauthorized('Unauthorized')
        const { id } = req.params
        const { success, message, data, status } = await new Post(req.user).getPost(Number(id))
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}

export const updatePost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new Errors.Unauthorized('Unauthorized')
        const { title, body } = req.body
        const { id } = req.params
        const { success, message, data, status } = await new Post(req.user).updatePost(Number(id), title, body)
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}

export const deletePost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new Errors.Unauthorized('Unauthorized')
        const { id } = req.params
        const { success, message, data, status } = await new Post(req.user).deletePost(Number(id),)
        return res.status(status ?? 200).json({ message, success, data })
    } catch (err) {
        next(err)
    }
}
