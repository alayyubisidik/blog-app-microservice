import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';


it('returns 401 if the user is not authenticated', async () => {
    return request(app)
        .delete('/api/categories/:sport')
        .send({
            name: "test"
        })
        .expect(401)
});

it('returns 404 if the category is not found', async () => {
    await request(app)
        .delete('/api/categories/testssss')
        .set('Cookie', await global.signin())
        .expect(404)
});

it('deletes the category if it exists', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Sport"
        })
        .expect(201);

    await request(app)
        .delete('/api/categories/sport')
        .set('Cookie', await global.signin())
        .expect(200);
});

it('emits an category deleted event', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Sport"
        })
        .expect(201);

    await request(app)
        .delete('/api/categories/sport')
        .set('Cookie', await global.signin())
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
