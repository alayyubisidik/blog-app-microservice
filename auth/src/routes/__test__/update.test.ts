import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";
import { natsWrapper } from "../../nats-wrapper";

// Helper function to create a user
const createUser = async (username: string, email: string, full_name: string, password: string) => {
    const user = User.build({ username, email, full_name, password, role: "author" });
    await user.save();
    return user;
};

it("updates user details successfully", async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .put(`/api/users/update/ayyub`)
        .set("Cookie", cookie)
        .send({
            username: "updateduser",
            email: "updated@gmail.com",
            full_name: "Updated User"
        })
        .expect(200);

    expect(response.body.data.username).toEqual("updateduser");
    expect(response.body.data.email).toEqual("updated@gmail.com");
    expect(response.body.data.full_name).toEqual("Updated User");
});

it("returns 401 when user is unauthenticated", async () => {
    await request(app)
        .put("/api/users/update/someuser")
        .send({ username: "newusername" })
        .expect(401);
});

it("returns 401 when user update other user data", async () => {
    const cookie = await global.signin();
    const user = await createUser("testuser1", "test1@gmail.com", "Test User 1", "password");

    await request(app)
        .put(`/api/users/update/${user.username}`)
        .set("Cookie", cookie)
        .send({ 
            username: "testuser2",
            email: "test2@gmail.com",
            full_name: "Test User 2"
        })
        .expect(401);
});


it("returns 400 when provided username is empty", async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .put(`/api/users/update/ayyub`)
        .set("Cookie", cookie)
        .send({ 
            username: "",
            email: "ayyub@gmail.com",
            full_name: "Ayyub"
        })
        .expect(400);

    expect(response.body.errors[0].field).toEqual("username");
    expect(response.body.errors[0].message).toEqual("Username cannot be empty");
});

it("returns 400 when provided email is invalid", async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .put(`/api/users/update/ayyub`)
        .set("Cookie", cookie)
        .send({ 
            username: "ayyub",
            email: "invalidemail",
            full_name: "Ayyub"
        })
        .expect(400);

    expect(response.body.errors[0].field).toEqual("email");
    expect(response.body.errors[0].message).toEqual("Email must be valid");
});

it("returns 400 when username is already in use", async () => {
    const cookie = await global.signin();
    await createUser("testuser1", "test1@gmail.com", "Test User 1", "password");

    const response = await request(app)
        .put(`/api/users/update/ayyub`)
        .set("Cookie", cookie)
        .send({ 
            username: "testuser1",
            email: "ayyub@gmail.com",
            full_name: "Ayyub"
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual("Username in use");
});

it("returns 400 when email is already in use", async () => {
    const cookie = await global.signin();
    await createUser("testuser1", "test1@gmail.com", "Test User 1", "password");

    const response = await request(app)
        .put(`/api/users/update/ayyub`)
        .set("Cookie", cookie)
        .send({
            username: "ayyub",
            email: "test1@gmail.com",
            full_name: "Ayyub"
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual("Email in use");   
});


it('emits an user updated event', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .put(`/api/users/update/ayyub`)
        .set("Cookie", cookie)
        .send({
            username: "updateduser",
            email: "updated@gmail.com",
            full_name: "Updated User"
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});