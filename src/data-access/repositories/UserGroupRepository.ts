import { BaseRepository } from "./base/BaseRepository";
import { IUserGroup } from "../../interfaces/IUserGroup";
import UserGroup from "../../models/UserGroup";
import { sequelize } from "../../loaders/postgres";
import Group from "../../models/Group";

export class UserGroupRepository extends BaseRepository<IUserGroup> {
  async deleteByUserId(userId: number): Promise<number> {
    const result = await UserGroup.destroy({
      where: {
        userId: userId,
      },
    });
    return result;
  }
  async deleteByGroupId(groupId: number): Promise<number> {
    const result = await UserGroup.destroy({
      where: {
        groupId: groupId,
      },
    });
    return result;
  }
  async addUsersToGroup(
    groupId: number,
    userIds: Array<number>
  ): Promise<boolean> {
    const transaction = await sequelize.transaction();
    try {
        const group = await Group.findOne({ where: { id: groupId }, transaction });
        if (!group) {
            throw new Error('Group does not exist');
        }

        const userGroupRecords = userIds.map(userId => ({
            groupId,
            userId
        }));

        await UserGroup.bulkCreate(userGroupRecords, { transaction });

        await transaction.commit();

        return true;

      } catch (error) {
        await transaction.rollback();
        return false;
      }
  }
}

export const repository = new UserGroupRepository(UserGroup);
