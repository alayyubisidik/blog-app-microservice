import mongoose from "mongoose";
import { Category } from "../../../models/category";
import { natsWrapper } from "../../../nats-wrapper";
import { CategoryUpdatedListener } from "../category-updated-listener";
import { CategoryUpdatedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new CategoryUpdatedListener(natsWrapper.client);

    const category = Category.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Sport",
        slug: "sport"
    });
    await category.save();

    const data: CategoryUpdatedEvent['data'] = {
        id: category.id,
        version: category.version + 1,
        name: 'Sport',
        slug: "sport",
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, category, data, msg }
}

it('finds, updates, and saves a category', async () => {
    const { listener, category, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedCategory = await Category.findById(category.id);

    expect(updatedCategory!.name).toEqual(data.name);
    expect(updatedCategory!.slug).toEqual(data.slug);
    expect(updatedCategory!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { listener, data, msg } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (error) {}

    expect(msg.ack).not.toHaveBeenCalled();
});

