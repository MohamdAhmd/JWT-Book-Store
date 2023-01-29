import UserModel from '../user.model';
import db from '../../Database'
import User from '../../types/user.type' 

const userModel = new UserModel()

describe('Authentication Module', () => {
    describe('Test method exist', () => {
        it('should have an authenticate user method' , () => {
            expect(userModel.authenticate).toBeDefined()
        })
    })
})


describe('Test Authentication Logic', () => {
    const user = {
        email:'test@example.com',
        user_name: 'testUser',
        first_name: 'test',
        last_name: 'User',
        password: 'testPassword'
    } as User
    beforeAll(async () => {
        const createdUser = await userModel.create(user)
        user.id = createdUser.id
    })
    afterAll(async () =>{
        const connection = await db.connect()
        const sql = 'Delete from users'
        await connection.query(sql)
        connection.release()
    })

    it('Authenticate method should return the authenticated user', async () => {
        const authenticatedUser = await userModel.authenticate(
            user.email,
            user.password as string
        )
        expect(authenticatedUser?.email).toBe(user.email)
        expect(authenticatedUser?.user_name).toBe(user.user_name)
        expect(authenticatedUser?.first_name).toBe(user.first_name)
        expect(authenticatedUser?.last_name).toBe(user.last_name)
      })
      it('Authenticate method should return null for wrong credentials', async () => {
        const authenticatedUser = await userModel.authenticate(
          'mohammed@elzanaty.com',
          'fake-password'
        )
        expect(authenticatedUser).toBe(null)
      })
    })

