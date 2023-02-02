import { Pool } from 'pg'
import config from '../config'
const pool = new Pool({
  host: config.POSTGRES_HOST,
  database: config.DATABASE,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  port: parseInt(config.POSTGRES_PORT as string, 10),
})

pool.on('error', (error: Error) => {
  console.error(error.message)
})
export default pool
