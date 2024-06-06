import { UserCreatedEvent } from "@alayyubisidikblog/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { UserCreatedListener } from "../user-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { User } from "../../../models/user";

const setup = async () => {
    // Create an instance of the listener
    const listener = new UserCreatedListener(natsWrapper.client);

    // Create a fake data event
    const data: UserCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        username: 'ayyub',
        full_name: "Ayyub",
    }

    // Create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg }
}

it('Creates and saves a user', async () => {
    const { listener, data, msg }= await setup();

    // Call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    // Write assertions to make sure a user was created
    const user = await User.findById(data.id);

    expect(user).toBeDefined();
    expect(user!.username).toEqual(data.username);
    expect(user!.full_name).toEqual(data.full_name);
});

it('acks the message', async () => {
    const { listener, data, msg }= await setup();

    // Call the onMessage functio with the data object + message object 
    await listener.onMessage(data, msg);

    // Write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();

});