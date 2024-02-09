import request from 'supertest';
import { app } from '../src/app';

describe('Home Controller', () => {
  it('Should be able to see the index page', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Meals Tracker - ');
  });
});
