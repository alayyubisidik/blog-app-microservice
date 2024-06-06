import { Listener, Subjects, CategoryCreatedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Category } from "../../models/category";

export class CategoryCreatedListener extends Listener<CategoryCreatedEvent> {
    subject: Subjects.CategoryCreated = Subjects.CategoryCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: CategoryCreatedEvent['data'], msg: Message) {
        const { id, name, slug} = data;


        const category = Category.build({
            id: id,
            name: name,
            slug: slug
        });
        await category.save();

        msg.ack();
    }
}