import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Repository, } from 'typeorm'

import AppDataSource from '../models';
import { Errors } from './'
import { isValidEmail } from "../utils";
import { UserEntity } from '../models'

export default class Auth {
    private user?: UserEntity;
    private userRepo: Repository<UserEntity>

    constructor(user?: UserEntity) {
        this.user = user
        this.userRepo = AppDataSource.getRepository(UserEntity)
    }

    async register(first_name: string, last_name: string, email: string, password: string) {

        if (!isValidEmail(email)) throw new Errors.BadRequest('Invalid Email Provided.')

        let user = await this.userRepo.findOne({ where: { email, deleted: false } })
        if (user) throw new Errors.Conflict('User Exists. Please Login')

        user = await this.userRepo.save(this.userRepo.create({ first_name, last_name, email, password: await bcrypt.hash(password, 10), }))

        const token = jwt.sign({ id: user.id, user_id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: "1h" });

        return {
            success: true,
            status: 200,
            message: 'Logged In.',
            data: {
                token,
                user: {
                    id: user.id, firstname: user.first_name, lastname: user.last_name, email: user.email,
                }
            },
        }
    }

    async login(email: string, password: string) {

        if (!isValidEmail(email)) throw new Errors.BadRequest('Invalid Email Provided.')

        const users = await this.userRepo.find({ where: { email, deleted: false } })

        if (users.length > 1) throw new Errors.Conflict('Duplicate accounts detected. Please contact admin to rectify.')

        let user = users[0]
        if (!user) throw new Errors.Unauthorized('Invalid credentials')
        this.user = user

        const { success } = await this.verifyPassword(password)
        if (!success) throw new Errors.BadRequest('Invalid credentials')

        const token = jwt.sign({ id: user.id, user_id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: "1h" });

        return {
            success: true,
            status: 200,
            message: 'Logged In.',
            data: {
                token,
                user: {
                    id: user.id, firstname: user.first_name, lastname: user.last_name, email: user.email,
                }
            },
        }
    }

    async verifyPassword(password: string) {
        if (!this.user) throw new Errors.BadRequest('Invalid phone number or pin')
        if (!this.user.password) throw new Errors.BadRequest(`Please reset your password to proceed.`)
        const matches = await bcrypt.compare(password, this.user.password)
        return { success: matches }
    }

    async deleteAccount(password: string) {
        if (!this.user) throw new Errors.NotFound('User not found')
        const { success } = await this.verifyPassword(password)
        if (!success) throw new Errors.Unauthorized('Invalid password.')

        this.user.deleted = true
        await this.userRepo.save(this.user)

        return { success: true, status: 200, data: null, message: 'Your account has been deleted.', }
    }
}