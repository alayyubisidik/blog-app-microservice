import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('returns 401 if the user is not authenticated', async () => {
    return request(app)
        .post('/api/categories')
        .send({
            name: "test"
        }) 
        .expect(401)
});

it('returns 400 if the name field is missing', async () => {
    return request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({})
        .expect(400)
});

it('returns 400 if the name field is invalid', async () => {
    return request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "te"
        })
        .expect(400)
});

it('returns 400 if the name field is already exists', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(201)

    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(400)
});

it('creates a category with valid inputs', async () => {
    const response = await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "test"
        })
        .expect(201);

    expect(response.body.data.name).toEqual("test");
    expect(response.body.data.slug).toEqual("test");
}); 

it('emits an category created event', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Sport"
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
