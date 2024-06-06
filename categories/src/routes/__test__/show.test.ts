import request from 'supertest';
import { app } from '../../app';

it('returns 404 if the category is not found', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(201);

    await request(app)
        .get('/api/categories/testssss')
        .set('Cookie', await global.signin())
        .expect(404)
});

it('returns the category if the category is found', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(201);

    const response = await request(app)
        .get('/api/categories/test')
        .set('Cookie', await global.signin())
        .expect(200)
    
    expect(response.body.data.name).toEqual("test");
    expect(response.body.data.slug).toEqual("test");
});
