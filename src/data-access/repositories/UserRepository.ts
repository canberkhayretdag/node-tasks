import { BaseRepository } from "./base/BaseRepository";
import { IUser } from "../../interfaces/IUser";
import { Op } from "sequelize";


export class UserRepository extends BaseRepository<IUser> {
    async suggest(str: string, limit: number): Promise<IUser[] | any> {
        const result = await this._model.findAll({
            where: {
              login: {
                [Op.like]: `%${str}%`,
              },
            },
            order: [["id", "ASC"]],
            limit: limit,
          });
        return result
    }

    async findByLogin(username: string, password: string): Promise<boolean> {
        const result = await this._model.findOne({
          where: {
            [Op.and]: [{ login: username }, { password: password }],
          },
        })
        if (result) {
          return true
        }
        return false;
    }

}