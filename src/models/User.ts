import { IUser } from '../interfaces/IUser';

import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../loaders/postgres";

const User = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  
    
  User.sync();
  
  export default User;
  