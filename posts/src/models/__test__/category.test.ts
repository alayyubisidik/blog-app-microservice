import mongoose from "mongoose";
import { Category } from "../category";

const createCategory = async () => {
    const category = Category.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Sport",
        slug: "sport"
    });

    await category.save();

    return category;
}


it('implements optimistic concurrency control ', async () => {
    const category = await createCategory();

    const firstInstance = await Category.findById(category.id);
    const secondInstance = await Category.findById(category.id);

    firstInstance!.set({ name: "update1" });
    secondInstance!.set({ name: "update2" });
    
    await firstInstance!.save();
    
    try {
        await secondInstance!.save();
    } catch (error) {
        return;
    }

    throw new Error('should not reach this point ');
});

it('increments the version number on multiple saves', async () => {
    const category = await createCategory();

    expect(category.version).toEqual(0);
    await category.save();
    expect(category.version).toEqual(1);
    await category.save();
    expect(category.version).toEqual(2);
});