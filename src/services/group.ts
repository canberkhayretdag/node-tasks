import Group from "../models/Group";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../loaders/postgres";
import { Service, Inject } from 'typedi';
import { GroupRepository, repository as groupRepository } from "../data-access/repositories/GroupRepository";
import { IGroupInputDTO } from "../interfaces/IGroup";
import { UserGroupRepository, repository as userGroupRepository  } from "@/data-access/repositories/UserGroupRepository";

@Service()
export class GroupService {

    private groupRepository: GroupRepository

    constructor(groupRepository: GroupRepository) {
        this.groupRepository = groupRepository;
    }
    
    async getById(id: number) {
      try {
        const group = await this.groupRepository.findOne(id)
        return group;
      } catch (error) {
        console.error(error);
      }
    }
  
    async getGroups() {
      try {
        const groups = await this.groupRepository.find()
        return groups;
      } catch (error) {
        console.error(error);
      }
    }
  
    async createGroup(groupInputDto: IGroupInputDTO) {
      try {
        const result = await this.groupRepository.create(groupInputDto);
        return result;
      } catch (error) {
        console.error(error);
      }
    }
  
    async deleteGroup(id: number) {
      try {
        const result = await this.groupRepository.delete(id)
        await userGroupRepository.deleteByGroupId(id);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  
    async updateGroup(id: number, groupInputDto: IGroupInputDTO) {
      try {
        const updatedGroup = await this.groupRepository.update(id, groupInputDto);
        return updatedGroup;
      } catch (error) {
        console.error(error);
      }
    }
  }

export const groupService = new GroupService(groupRepository);