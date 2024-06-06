import { Listener, Subjects, CategoryUpdatedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Category } from "../../models/category";

export class CategoryUpdatedListener extends Listener<CategoryUpdatedEvent> {
    subject: Subjects.CategoryUpdated = Subjects.CategoryUpdated;
    queueGroupName: string = queueGroupName;
    
    async onMessage(data: CategoryUpdatedEvent['data'], msg: Message) {
        const { name, slug } = data;

        const category = await Category.findByEvent(data);

        if (!category) {
            throw new Error('Category not found');
        }

        category.set({ name, slug });
        await category.save();

        msg.ack();
    }
}