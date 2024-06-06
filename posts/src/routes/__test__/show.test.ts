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

it('returns 404 if the post is not found', async () => {
    const category = await createCategory();
    const user = await createUser();

    await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test",
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(201);

    await request(app)  
        .get('/api/posts/tests')
        .expect(404);
});  

it('returns 200 if the post is found', async () => {
    const category = await createCategory();
    const user = await createUser();

    await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test",
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(201);

    const response = await request(app)  
        .get('/api/posts/test')
        .expect(200);

    expect(response.body.data.title).toEqual("test");
});  