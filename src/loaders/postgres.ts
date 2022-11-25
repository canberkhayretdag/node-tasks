import { Sequelize } from "sequelize";
import config from "../config";

const sequelize = new Sequelize(config.DB);

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (_) {
    console.error("Unable to connect to the database.");
  }
  
  export { sequelize };