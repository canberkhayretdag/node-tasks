import { DataTypes } from "sequelize";
import { sequelize } from "../loaders/postgres";

const UserGroup = sequelize.define("UserGroup", {
    userId: {
        type: DataTypes.INTEGER,
    },
    groupId: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
  });
  
    
  UserGroup.sync();
  
  export default UserGroup;
  