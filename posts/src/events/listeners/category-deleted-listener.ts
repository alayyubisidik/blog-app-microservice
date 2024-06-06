import { Listener, Subjects, CategoryDeletedEvent } from "@alayyubisidikblog/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Category } from "../../models/category";
import { Post } from "../../models/post";

export class CategoryDeletedListener extends Listener<CategoryDeletedEvent> {
    subject: Subjects.CategoryDeleted = Subjects.CategoryDeleted;
    queueGroupName: string = queueGroupName;
    
    async onMessage(data: CategoryDeletedEvent['data'], msg: Message) {
        const { id } = data;

        console.log(data)

        const category = await Category.findByEvent(data);

        if (!category) {
            throw new Error('Category not foundd');
        }

        await Post.deleteMany({ category: category._id });
        await Category.deleteOne({ _id: id });

        // // Hapus semua post yang memiliki referensi ke kategori ini

        msg.ack();
    }
}