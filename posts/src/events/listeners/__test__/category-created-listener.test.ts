import { CategoryCreatedEvent } from "@alayyubisidikblog/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { CategoryCreatedListener } from "../category-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Category } from "../../../models/category";

const setup = async () => {
    // Create an instance of the listener
    const listener = new CategoryCreatedListener(natsWrapper.client);

    // Create a fake data event
    const data: CategoryCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'Sport',
        slug: 'slug',
    }

    // Create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg }
}

it('Creates and saves a category', async () => {
    const { listener, data, msg }= await setup();

    // Call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    // Write assertions to make sure a category was created
    const category = await Category.findById(data.id);

    expect(category).toBeDefined();
    expect(category!.name).toEqual(data.name);
    expect(category!.slug).toEqual(data.slug);
});

it('acks the message', async () => {
    const { listener, data, msg }= await setup();

    // Call the onMessage functio with the data object + message object 
    await listener.onMessage(data, msg);

    // Write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();

});