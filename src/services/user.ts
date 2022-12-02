import User from "../models/User";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../loaders/postgres";
import { Service, Inject } from 'typedi';
import { UserRepository, repository as userRepository } from "../data-access/repositories/UserRepository";
import { IUserInputDTO } from "../interfaces/IUser";
import { GroupRepository, repository as groupRepository  } from "@/data-access/repositories/GroupRepository";
import { UserGroupRepository, repository as userGroupRepository  } from "@/data-access/repositories/UserGroupRepository";

@Service()
export class UserService {

    private userRepository: UserRepository
    private groupRepository: GroupRepository
    private userGroupRepository: UserGroupRepository

    constructor(
      userRepository: UserRepository,
      userGroupRepository: UserGroupRepository
    ) {
        this.userRepository = userRepository;
        this.userGroupRepository = userGroupRepository;
    }
    
    async getById(id: number) {
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
  
    async deleteUser(id: number) {
      try {
        const result = await this.userRepository.delete(id);
        await this.userGroupRepository.deleteByUserId(id);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  
    async updateUser(id: number, updateUserDto: IUserInputDTO) {
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

    async addUsersToGroup (groupId: number, userIds: Array<number>) {
      try {
        const result = await this.userGroupRepository.addUsersToGroup(groupId, userIds);
        return result;
      } catch (error) {
        console.log(error)
      }
    }

  }

export const userService = new UserService(userRepository, userGroupRepository);