process.env.NODE_ENV = 'test'

const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

let newItem = { name: 'eggs', price: 1.99 }
let postItem = { name: 'bacon', price: 3.99 }

beforeEach(() => {
    items.push(newItem)
})

afterEach(() => {
    items.length = 0;
})

describe('GET /items', () => {
    test('Get all items route', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [newItem] })
    })
})

describe('GET /items/:name', () => {
    test('Get item by name', async () => {
        const res = await request(app).get(`/items/${newItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "item": newItem })
    })
    test('Searching for invalid name', async () => {
        const res = await request(app).get(`/items/milk`);
        expect(res.statusCode).toBe(404);
    })
})

describe('POST /items', () => {
    test('Post new item', async () => {
        const res = await request(app).post('/items').send(postItem);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ "added": postItem })
    })
    test('Post empty item should return 404', async () => {
        const res = await request(app).post('/items').send();
        expect(res.statusCode).toBe(404);
    })
})

describe('PATCH /items/:name', () => {
    test('Patch existing item', async () => {
        const res = await request(app).patch(`/items/${newItem.name}`).send({ name: 'cheese', price: 5.99 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: 'cheese', price: 5.99 } })
    })
    test('Patch item that does not exist', async () => {
        const res = await request(app).patch(`/items/${newItem.name}`).send();
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /items/:name', () => {
    test('Delete existing item', async () => {
        const res = await request(app).delete(`/items/${newItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted' })
    })
    test('Delete invalid item', async () => {
        const res = await request(app).delete('/items/onions');
        expect(res.statusCode).toBe(404);
    })
})