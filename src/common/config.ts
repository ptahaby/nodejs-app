import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const { 
  PORT, NODE_ENV, MONGO_CONNECTION_STRING, SALT_ROUNDS ='10',
  JWT_SECRET_KEY, AUTH_MODE: AUTH_MODE_PROPS,
  POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB
} = process.env;
const AUTH_MODE:boolean = AUTH_MODE_PROPS === 'true';

export {
  PORT,
  NODE_ENV,
  SALT_ROUNDS,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
};
