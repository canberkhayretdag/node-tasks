import User from "../models/User";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../loaders/postgres";
import { Service, Inject } from 'typedi';
import { UserRepository } from "../data-access/repositories/UserRepository";
import { IUserInputDTO } from "../interfaces/IUser";
import Token from "../models/Token";
import { AuthRepository } from "../data-access/repositories/AuthRepository";

@Service()
export default class AuthService {

    private userRepository: UserRepository
    private authRepository: AuthRepository

    constructor(userRepository: UserRepository, authRepository: AuthRepository) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }
    
    async login (username: string, password: string): Promise<string> {
        try {
            const result = await this.userRepository.findByLogin(username, password);
            if (result) {
                const token = Math.random().toString(36).substring(2, 12);
                await this.authRepository.create({
                    value: token,
                });
                return token
            }
            return null
        } catch (error) {
            console.error(error);
        }
    }
  }