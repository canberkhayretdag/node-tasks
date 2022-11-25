import { IWrite } from '../../interfaces/IWrite';
import { IRead } from '../../interfaces/IRead';
import { BuildOptions, Model } from "sequelize";
import { IUser } from '../../../interfaces/IUser'

type ModelStatic = typeof Model & (new(values?: object, options?: BuildOptions) => Model)

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

    public readonly _model: ModelStatic;

    constructor(model: ModelStatic) {
        this._model = model;
    }

    async create(item: T | any): Promise<boolean> {
        const result = await this._model.create(item);
        return (result ? true : false)
    }
    async update(id: string, item: T | any): Promise<boolean> {
        const result: T | any = await this._model.update(item, {
                where: {
                  id: id,
                },
              }
        );
        return result
    }
    async delete(id: string): Promise<boolean> {
        const result: T | any  = await this._model.destroy({
            where: {
              id: id,
            },
          });
        return result;
    }
    async find(): Promise<T[]> {
        const result: T | any = await this._model.findAll();
        return result
    }
    async findOne(id: string): Promise<T> {
        const result: T | any = await this._model.findByPk(id)
        return result
    }
    
}