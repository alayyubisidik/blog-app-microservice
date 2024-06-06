import mongoose from "mongoose";
import { Category } from "../../../models/category";
import { natsWrapper } from "../../../nats-wrapper";
import { CategoryDeletedListener } from "../category-deleted-listener";
import { CategoryDeletedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";
import { Post } from "../../../models/post";

const setup = async () => {
    const listener = new CategoryDeletedListener(natsWrapper.client);

    const category = Category.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Sport",
        slug: "sport"
    });
    await category.save();

    const data: CategoryDeletedEvent['data'] = {
        id: category.id,
        version: category.version + 1,
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, category, data, msg }
}

it('finds and delete category', async () => {
    const { listener, category, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const deletedPosts = await Post.find({ category: category });
    const deletedCategory = await Category.findById(category.id);

    expect(deletedCategory).toBeNull();
    expect(deletedPosts).toHaveLength(0);
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

