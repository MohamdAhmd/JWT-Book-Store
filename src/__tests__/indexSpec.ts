import supertest from 'supertest';
import app from '../index'

const request = supertest(app)


describe('Test Basic Endpoint Server', () => {
    it('Get The / Endpoint' , async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })
})