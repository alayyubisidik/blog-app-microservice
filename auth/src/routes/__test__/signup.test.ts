import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(201);
});

it('returns a 400 with missing email, password, username, fullname', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            password: "test",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(400);
        
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(400);
        
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            username: "ayyub",
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('emits an user created event', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});