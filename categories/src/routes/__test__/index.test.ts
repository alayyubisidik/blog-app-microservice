import request from 'supertest';
import { app } from '../../app';

it('returns a list of categories', async () => {
    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Sport"
        })
        .expect(201);

    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Technology"
        })
        .expect(201);

    await request(app)
        .post('/api/categories')
        .set('Cookie', await global.signin())
        .send({
            name: "Politic"
        })
        .expect(201);

    const response = await request(app)
        .get('/api/categories')
        .expect(200);

    expect(response.body.data.length).toEqual(3);
    expect(response.body.data[0].name).toEqual("Sport");
    expect(response.body.data[1].name).toEqual("Technology");
    expect(response.body.data[2].name).toEqual("Politic");
});
