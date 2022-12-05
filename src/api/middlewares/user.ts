import joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { IUserInputDTO } from '../../interfaces/IUser'

const userValidation = z.object({
  login: z.string().min(6),
  password: z.string().min(6),
  age: z.number().min(4).max(130).optional(),
})

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    userValidation.parse(req.body);
    return next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export { validateUser };
