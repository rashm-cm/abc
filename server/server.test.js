// server.test.js
const request = require('supertest');
const app = require('./server');
const db = require('./sequelize'); // Assuming sequelize is configured here

// Mock database functions
jest.mock('./sequelize', () => ({
  User: {
    findOne: jest.fn()
  }
}));

describe('POST /login', () => {
  it('should login successfully with valid credentials', async () => {
    db.User.findOne.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: '$2b$10$somethinghashed', // assume bcrypt hash
      validatePassword: jest.fn().mockResolvedValue(true),
    });

    const res = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 with invalid credentials', async () => {
    db.User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid email or password');
  });
});
