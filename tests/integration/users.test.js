
const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');

beforeEach(async () => {
  await db.query('DROP TABLE IF EXISTS users');

  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      nom TEXT NOT NULL
    )
  `);

  await db.query(
    "INSERT INTO users (nom) VALUES ('Alice')"
  );
});

afterAll(async () => {
  await db.end();
});

describe('GET /users/:id', () => {

  test("retourne 200 et l'utilisateur existant", async () => {
    const res = await request(app).get('/users/1');

    expect(res.status).toBe(200);
    expect(res.body.nom).toBe('Alice');
  });

  test("retourne 404 si l'utilisateur n'existe pas", async () => {
    const res = await request(app).get('/users/999');

    expect(res.status).toBe(404);
    expect(res.body.erreur).toBe('introuvable');
  });

  test("retourne 400 si l'identifiant est invalide", async () => {
    const res = await request(app).get('/users/abc');

    expect(res.status).toBe(400);
    expect(res.body.erreur).toBe('id invalide');
  });

  test("protège contre une injection SQL", async () => {
    const res = await request(app).get('/users/1 OR 1=1');

    expect(res.status).toBe(400);
    expect(res.body.erreur).toBe('id invalide');
  });

});
