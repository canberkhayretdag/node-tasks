import { AuthRepository } from "../../data-access/repositories/AuthRepository";
import { Request, Response, NextFunction } from 'express';
import Token from "../../models/Token";
import User from "../../models/User";
import AuthService from "../../services/auth";

const authRepository = new AuthRepository(Token)

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["epam-token"];
  if (token === null) {
    return res.status(400).send("epam-token is not found!");
  }
  const tokenExists = await authRepository.findByValue(token[0]);
  if (tokenExists) {
    return next();
  } else {
    return res.status(401).send("Authentication is failed!");
  }
};

export { checkAuth };
