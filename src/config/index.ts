import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    DB: process.env.DB,
    port: process.env.PORT,
    api: {
      prefix: '/api/v1',
    },
};