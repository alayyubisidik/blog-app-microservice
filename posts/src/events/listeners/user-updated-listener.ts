import { Listener, Subjects, UserUpdatedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";

export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
    queueGroupName: string = queueGroupName;
    
    async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
        const { username, full_name } = data;

        const user = await User.findByEvent(data);

        if (!user) {
            throw new Error('User not found');
        }

        try {
            user.set({ username, full_name });
            await user.save();
            msg.ack();
        } catch (error) {
            console.log("Gagaalaaal")
        }

    }
}  