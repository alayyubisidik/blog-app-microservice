import { Listener, Subjects, UserCreatedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        const { username, full_name, id } = data;


        const user = User.build({
            id: id,
            username: username,
            full_name: full_name,
        });
        await user.save();

        msg.ack();
    }
}