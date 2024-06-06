import mongoose from "mongoose";
import { User } from "../../../models/user";
import { natsWrapper } from "../../../nats-wrapper";
import { UserUpdatedListener } from "../user-updated-listener";
import { UserUpdatedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new UserUpdatedListener(natsWrapper.client);

    const user = User.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        username: "ayyub",
        full_name: "Ayyub"
    });
    await user.save();

    const data: UserUpdatedEvent['data'] = {
        id: user.id,
        version: user.version + 1,
        username: 'messi',
        full_name: "Messi",
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, user, data, msg }
}

it('finds, updates, and saves a user', async () => {
    const { listener, user, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedUser = await User.findById(user.id);

    expect(updatedUser!.username).toEqual(data.username);
    expect(updatedUser!.full_name).toEqual(data.full_name);
    expect(updatedUser!.version).toEqual(data.version);
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

