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


it('returns 401 if the user is unauthenticated ', async () => {
    await request(app)
        .post('/api/posts')
        .expect(401)
});

it('returns 400 if the title field is missing or invalid', async () => {
    const category = await createCategory();

    const response1 = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            content: "test",
            category_id: category.id
        })
        .expect(400);

    expect(response1.body.errors[0].field).toEqual("title");
    expect(response1.body.errors[0].message).toEqual("Title is required");
    
    const response2 = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "te",
            content: "etwr",
            category_id: category.id
        })
        .expect(400);
        
    expect(response2.body.errors[0].field).toEqual("title");
    expect(response2.body.errors[0].message).toEqual("Title must be between 3 and 255 characters long");
});

it('returns 400 if the content field is missing', async () => {
    const category = await createCategory();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test",
            category_id: category.id
        })
        .expect(400);

    expect(response.body.errors[0].field).toEqual("content");
    expect(response.body.errors[0].message).toEqual("Content is required");
});

it('returns 400 if the category_id field is missing', async () => {
    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "test",
            content: "tess",
        })
        .expect(400);

    expect(response.body.errors[0].field).toEqual("category_id");
    expect(response.body.errors[0].message).toEqual("Category ID is required");
});

it('returns 200 if if the post is successfully created', async () => {
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
});

it('returns 400 if if the post is already exists', async () => {
    const category = await createCategory();
    const user = await createUser();

    const title = "Test";

    await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: title,
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(201);
    
    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: title,
            content: "tess",
            category_id: category.id,
            user_id: user.id
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual("Post already exists");
});

it('returns 404 if the category is not found', async () => {
    const user = await createUser();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "Test",
            content: "tess",
            category_id: new mongoose.Types.ObjectId().toHexString(),
            user_id: user.id
        })
        .expect(404);

    expect(response.body.errors[0].message).toEqual("Category not found");
});

it('returns 404 if the user is not found', async () => {
    const category = await createCategory();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', await global.signin())
        .send({
            title: "Test",
            content: "tess",
            category_id: category.id,
            user_id: new mongoose.Types.ObjectId().toHexString(),
        })
        .expect(404);

    expect(response.body.errors[0].message).toEqual("User not found");
});
