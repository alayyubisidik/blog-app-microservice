import request from 'supertest';
import { app } from '../../app';
import { Category } from '../../models/category';
import mongoose from 'mongoose';
import { User } from '../../models/user';

const createCategory = async () => {
    const category = Category.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Sport",
        slug: "sport"
    });
    await category.save();

    return category;
}

const createUser = async () => {
    const user = User.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        username: "ayyub",
        full_name: "Ayyub"
    });
    await user.save();

    return user;
}

it('returns a list of posts', async () => {
    const category = await createCategory();
    const user = await createUser();

    await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test1",
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(201);

    await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test2",
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(201);

    await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test3",
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(201);

    const response = await request(app)
        .get('/api/posts')
        .expect(200);

    expect(response.body.data.length).toEqual(3);
    expect(response.body.data[0].title).toEqual("test1");
    expect(response.body.data[1].title).toEqual("test2");
    expect(response.body.data[2].title).toEqual("test3");
});
