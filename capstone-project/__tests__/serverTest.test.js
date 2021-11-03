import { app } from '../src/server/index';
const supertest = require('supertest');
const request = supertest(app)

describe('GET root directory', function() {
  it('Testing root endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200) // check if request was successfull
    expect(response.body).toBeDefined();
  });
});



