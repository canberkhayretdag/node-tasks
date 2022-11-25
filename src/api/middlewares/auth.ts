import { AuthRepository } from "../../data-access/repositories/AuthRepository";
import { UserRepository } from "../../data-access/repositories/UserRepository";
import Token from "../../models/Token";
import User from "../../models/User";
import AuthService from "../../services/auth";

const authRepository = new AuthRepository(Token)

const checkAuth = async (req, res, next) => {
  const token = req.headers["epam-token"];
  if (token === null) {
    return res.status(400).send("epam-token is not found!");
  }
  const tokenIsExists = await authRepository.findByValue(token);
  if (tokenIsExists) {
    next();
  } else {
    return res.status(400).send("Authentication is failed!");
  }
};

export { checkAuth };
