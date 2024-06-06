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

const createPost = async () => {
    const category = await createCategory();
    const user = await createUser();

    const { body } = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test",
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(201);
    
    return body.data;
}

it('returns 401 if the user is not authenticated', async () => {
    return request(app)
        .delete('/api/posts/:sport')
        .expect(401)
});

it('returns 404 if the post is not found', async () => {
    await request(app)
        .delete('/api/posts/testssss')
        .set('Cookie', await global.signin())
        .expect(404)
});

it('returns 401 if user delete other user post', async () => {
    const post = await createPost();

    await request(app)
        .put('/api/posts/test')
        .set('Cookie', await global.signin())
        .send({
            title: "test",
            content: "tess",
            category_id: post.category.id,
            user_id: post.user.id
        })
        .expect(401);
});

// it('deletes the post if it exists', async () => {
//     const category = await createCategory();
//     const user = await createUser();

//     await request(app)
//         .post('/api/posts')
//         .set('Cookie', await global.signin())
//         .send({
//             title: "test",
//             content: "tess",
//             category_id: category.id,
//             user_id: user.id
//         })
//         .expect(201);

//     await request(app)
//         .delete('/api/posts/test')
//         .set('Cookie', await global.signin())
//         .expect(200);
// });