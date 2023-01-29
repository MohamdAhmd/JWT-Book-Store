import db from '../Database'
import User from '../types/user.type'
import config from '../config'
import bcrypt from 'bcrypt'


const hashPassword = (password: string) => {
  const salt = parseInt(config.SALT_PASSWORD as string, 10)
  return bcrypt.hashSync(`${password}${config.BEPPER_PASSWORD}`, salt)
}


class userModel {
// create new user
async create(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) 
        RETURNING id, email, user_name, first_name, last_name`
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password as string)
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Unable to create (${u.user_name}): ${(error as Error).message}`
      )
    }
  }
// GET ALL Users
async getMany(): Promise<User[]> {
  try {
    const connection = await db.connect()
    const sql = 'SELECT id, email, user_name, first_name, last_name FROM users';
    const result = await connection.query(sql)
    connection.release()
    return result.rows;
  } catch (error) {
    throw new Error(
      `Unable To Get All Users ${(error as Error).name}: ${(error as Error).message}`
    )

  }
}

// Get Specific User 
async getOneUser(id:string):Promise<User>{
  try {
    const connection = await db.connect()
    const sql = `SELECT id, email, user_name, first_name, last_name FROM users
                  WHERE id=($1)`;
    const result = await connection.query(sql,[id]);
    return result.rows[0]
  } catch (error) {
    throw new Error(`Unable to retrieve user ${id}, ${(error as Error).message}`)
    
  }
}

//UPDATE USER
async updateOne(u:User):Promise<User>{
  try {
   const connection = await db.connect();
    const sql = `UPDATE users 
                SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 
                WHERE id=$6 
                RETURNING id, email, user_name, first_name, last_name`
    const result = await connection.query(sql,[
      u.email,
      u.user_name,
      u.first_name,
      u.last_name,
      hashPassword(u.password as string),
      u.id
    ])
    connection.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(`Could not update ${u.user_name}, ${(error as Error).message}`);
  }
}


//DELETE USER 
async deleteUser(id: string):Promise<User>{
  try {
    const connection = await db.connect();
    const sql = `DELETE FROM users WHERE id=($1)
                RETURNING id, email,user_name, first_name, last_name`
    const result = await connection.query(sql,[id]);
    connection.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(`Could not delete ${id},${(error as Error).message}`);
  }
}

// AUTHENTICATION INFO FOR SUER LOGIN
async authenticate(email: string, password: string): Promise<User | null> {
  try {
    const connection = await db.connect();
    const sql = 'SELECT password from users WHERE email=$1'
    const result = await connection.query(sql,[email])
    if(result.rows.length){
      const {password : hashPassword} = result.rows[0]
      const isValid = bcrypt.compareSync(`${password}${config.BEPPER_PASSWORD}`,hashPassword)
      if(isValid){
        const Info = await connection.query('SELECT id,email,user_name,first_name,last_name from users WHERE email=($1)',[email])
        return Info.rows[0]
      }
    }
    
    connection.release()
    return null
  } catch (error) {
    throw new Error(`Unable to login: ${(error as Error).message}`);
  }
}


}

export default userModel





