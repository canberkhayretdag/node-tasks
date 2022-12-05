import { AuthRepository } from "../../data-access/repositories/AuthRepository";
import { Request, Response, NextFunction } from 'express';
import Token from "../../models/Token";
import User from "../../models/User";
import AuthService from "../../services/auth";
import jwt from "jsonwebtoken";
import config from "../../config";
import { IUser } from "@/interfaces/IUser";

const authRepository = new AuthRepository(Token)

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['epam-token'] as string;
  if (token === null) {
    return res.status(401);
  }
  console.log(token)
  jwt.verify(token, config.secretKey, (err: Error, user: IUser) => {
    if (err) {
        return res.sendStatus(403);
    }
    next()
})

};

export { checkAuth };
