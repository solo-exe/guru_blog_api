import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as jwt from "jsonwebtoken";

import AppDataSource, { UserEntity } from '../models';
import { Errors } from '../services';
import { AuthenticatedRequest } from 'src/types';

// AUTHORIZATION MIDDLEWARE
export const authorizeUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userRepo = AppDataSource.getRepository(UserEntity)

    const token = (req.headers.authorization?.split(" ")[1] || req.cookies['token']);
    if (!token) throw new Errors.Unauthorized('Unauthorized')
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "") as any;
    // add the session id to the request
    req.user = await userRepo.findOne({ where: { id: decodedToken.user_id, deleted: false } });
    if (!req.user) throw new Errors.Unauthorized('Unauthorized')
    next();
  } catch (error) {
    console.log('PAYLOAD VALIDATION ERROR', error);
    res.status(401).json({ message: "Unauthorized" });
  }
}


export const validatePayload = (dtoClass: any, reqProp: 'body' | 'query' | 'params') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = plainToInstance(dtoClass, req[reqProp]);
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        const errorMessages = errors.map((error: ValidationError) =>
          Object.values(error.constraints || {})
        ).flat();
        return res.status(400).json({ errors: errorMessages });
      }
      next();
    } catch (error) {
      console.log('PAYLOAD VALIDATION ERROR', error);
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};