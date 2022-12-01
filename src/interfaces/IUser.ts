export interface IUser {
    id: number;
    login: string;
    password: string;
    age: number;
    isdeleted: boolean;
  }
  
export interface IUserInputDTO {
    login: string;
    password: string;
    age: number;
  }