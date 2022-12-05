import { IToken } from '../interfaces/IToken';
import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../loaders/postgres";

const Token = sequelize.define("Tokens", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  
    
  Token.sync();
  
  export default Token;
  