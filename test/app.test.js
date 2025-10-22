const request = require('supertest');
const { app, server } = require('../src/app');

describe('API Tests', () => {
  afterAll(() => {
    server.close();
  });

  test('GET / should return success message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBeDefined();
  });

  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET /api/info should return app information', async () => {
    const response = await request(app).get('/api/info');
    expect(response.statusCode).toBe(200);
    expect(response.body.app).toBe('Jenkins Demo App');
    expect(response.body.version).toBe('1.0.0');
  });
});