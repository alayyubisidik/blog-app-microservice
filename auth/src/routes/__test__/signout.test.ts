import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "test",
            username: "ayyub",
            full_name: "Al Ayyubi Sidik"
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signout')
        .expect(200);

    const cookie = response.get('Set-Cookie');
    if (cookie && cookie.length > 0) {
        expect(cookie[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
    } 
});


