import request from 'supertest';
import App from '../src/app.js';

describe('Smoke Test', () => {
  const app = new App().getApp();

  it('should return health check status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', message: 'Event Management API is running' });
  });
});
