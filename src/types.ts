import { Request } from 'express';
import { UserEntity } from './models/user.entity';

export interface AuthenticatedRequest extends Request {
    user?: UserEntity;
}