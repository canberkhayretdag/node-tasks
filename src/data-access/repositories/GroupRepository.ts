import { BaseRepository } from "./base/BaseRepository";
import { IGroup } from "../../interfaces/IGroup";
import { Op } from "sequelize";
import Group from "../../models/Group";


export class GroupRepository extends BaseRepository<IGroup> {}

export const repository = new GroupRepository(Group);