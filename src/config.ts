import dotenv from 'dotenv'

dotenv.config()

const {
  NODE_ENV,
  port,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BEPPER_PASSWORD,
  SALT_PASSWORD,
  JWT_SECRET,
} = process.env

export default {
  port: port,
  POSTGRES_HOST: POSTGRES_HOST,
  POSTGRES_PORT: POSTGRES_PORT,
  DATABASE: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  POSTGRES_USER: POSTGRES_USER,
  POSTGRES_PASSWORD: POSTGRES_PASSWORD,
  BEPPER_PASSWORD: BEPPER_PASSWORD,
  SALT_PASSWORD: SALT_PASSWORD,
  JWT_SECRET: JWT_SECRET,
}
