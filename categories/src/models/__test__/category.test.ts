import { Category } from "../category";

it('implements optimistic concurrency control', async () => {
    const category = Category.build({
        name: 'Sport',
        slug: "sport"
    });
    await category.save();

    const firstInstance = await Category.findById(category.id);
    const secondInstance = await Category.findById(category.id);

    firstInstance!.set({ name: 10 });
    secondInstance!.set({ name: 15 });
    
    await firstInstance!.save();
    
    try {
        await secondInstance!.save();
    } catch (error) {
        return;
    }

    throw new Error('should not reach this point ');
});

it('increments the version number on multiple saves', async () => {
    const category = Category.build({
        name: 'Sport',
        slug: "sport"
    });

    await category.save();
    expect(category.version).toEqual(0);
    await category.save();
    expect(category.version).toEqual(1);
    await category.save();
    expect(category.version).toEqual(2);
});