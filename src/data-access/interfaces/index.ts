
export interface IRead<T> {
    find(item: T): Promise<T[]>;
    findOne(id: number): Promise<T>;
  }

export interface IWrite<T> {
    create(item: T): Promise<boolean>;
    update(id: number, item: T): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}