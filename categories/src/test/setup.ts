import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@gmail.com',
        role: "admin"
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`session=${base64}`];
}