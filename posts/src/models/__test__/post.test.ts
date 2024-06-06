import mongoose from "mongoose";
import { Post } from "../post";
import { User } from "../user";
import { Category } from "../category";

const createPost = async () => {
    const user = User.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        username: "test",
        full_name: "test"
    });

    const category = Category.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Sport",
        slug: "sport"
    });

    const post = Post.build({
        title: 'Test',
        slug: "test",
        content: "test",
        user: user,
        category: category
    });
    await post.save();

    return post;
}

it('implements optimistic concurrency control', async () => {
    const post = await createPost();

    const firstInstance = await Post.findById(post.id);
    const secondInstance = await Post.findById(post.id);

    firstInstance!.set({ title: "update1" });
    secondInstance!.set({ title: "update2" });
    
    await firstInstance!.save();
    
    try {
        await secondInstance!.save();
    } catch (error) {
        return;
    }

    throw new Error('should not reach this point ');
});

it('increments the version number on multiple saves', async () => {
    const post = await createPost();

    expect(post.version).toEqual(0);
    await post.save();
    expect(post.version).toEqual(1);
    await post.save();
    expect(post.version).toEqual(2);
});