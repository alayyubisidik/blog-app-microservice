import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('returns 401 if the user is not authenticated', async () => {
    return request(app)
        .put('/api/categories/test')
        .send({
            name: "test"
        })
        .expect(401)
});

it('returns 404 if the name field is missing or invalid', async () => {
    await request(app)
        .put('/api/categories/test')
        .set('Cookie', await global.signin())
        .send({})
        .expect(400)

    await request(app)
        .put('/api/categories/test')
        .set('Cookie', await global.signin())
        .send({
            name: "te"
        })
        .expect(400)
});

it('returns 404 if the category is not found', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(201)

    await request(app)
        .put('/api/categories/testssss')
        .set('Cookie', await global.signin())
        .send({
            name: "testyyy"
        })
        .expect(404);
});

it('updates the category with valid inputs', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(201)

    const response = await request(app)
        .put('/api/categories/test')
        .set('Cookie', await global.signin())
        .send({
            name: "Sport"
        })
        .expect(200);

    expect(response.body.data.name).toEqual("Sport");
    expect(response.body.data.slug).toEqual("sport");
});

it('prevents updating to an existing category name', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Ayyub"
        })
        .expect(201)

    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Messi"
        })
        .expect(201)

    await request(app)
        .put('/api/categories/ayyub')
        .set('Cookie', await global.signin())
        .send({
            name: "Messi"
        })
        .expect(400);
});

it('emits an order updated event', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(201)

    await request(app)
        .put('/api/categories/test')
        .set('Cookie', await global.signin())
        .send({
            name: "Sport"
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
