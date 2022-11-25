import { BaseRepository } from "./base/BaseRepository";
import { IToken } from "../../interfaces/IToken";


export class AuthRepository extends BaseRepository<IToken> {
    async findByValue(val: string): Promise<IToken | any> {
        const result = await this._model.findOne({
            where: {
                value: val
            }
        })
        if (result) {
            return result
        }
        return null
    }
}