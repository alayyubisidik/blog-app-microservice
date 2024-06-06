import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
    var signin: () => any;
}

jest.mock('../nats-wrapper.ts');

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "asdaf";

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany();
    }
});
 
afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }

    await mongoose.connection.close();
});

global.signin = async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "ayyub@gmail.com",
            password: "password",
            username: "ayyub",
            full_name: "Ayyub"
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}