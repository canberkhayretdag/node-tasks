import User from "../models/User";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../loaders/postgres";
import { Service, Inject } from 'typedi';
import { UserRepository } from "../data-access/repositories/UserRepository";
import { IUserInputDTO } from "../interfaces/IUser";

@Service()
export default class UserService {

    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    
    async getById(id: string) {
      try {
        const user = await this.userRepository.findOne(id)
        return user;
      } catch (error) {
        console.error(error);
      }
    }
  
    async getUsers() {
      try {
        const users = await this.userRepository.find()
        return users;
      } catch (error) {
        console.error(error);
      }
    }
  
    async createUser(createUserDto: IUserInputDTO) {
      try {
        const result = await this.userRepository.create(createUserDto);
        return result;
      } catch (error) {
        console.error(error);
      }
    }
  
    async deleteUser(id: string) {
      try {
        const result = await this.userRepository.delete(id)
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  
    async updateUser(id: string, updateUserDto: IUserInputDTO) {
      try {
        const updatedUser = await this.userRepository.update(id, updateUserDto);

        return updatedUser;
      } catch (error) {
        console.error(error);
      }
    }
  
    async getAutoSuggestUsers(str: string, limit: number) {
      try {
        const results = await this.userRepository.suggest(str, limit);
        return results;
      } catch (error) {
        console.error(error);
      }
    }
  }