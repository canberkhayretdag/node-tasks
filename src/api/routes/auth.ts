import { Router, Request, Response } from 'express';
import { repository as userRepository } from '../../data-access/repositories/UserRepository';
import User from '../../models/User';
import AuthService from '../../services/auth';
import { AuthRepository } from '../../data-access/repositories/AuthRepository';
import Token from '../../models/Token';
const route = Router();

const authRepository = new AuthRepository(Token)
const authService = new AuthService(userRepository, authRepository)

export default (app: Router) => {
    app.use('/auth', route);

    route.post("/login", async (req: Request, res:Response) => {
        if (req.body.login && req.body.password) {
          const result = await authService.login(req.body.login, req.body.password);
          if (result) return res.status(200).send(result);
        }
        return res.status(400).send("Invalid username or password received.");
    }); 
};