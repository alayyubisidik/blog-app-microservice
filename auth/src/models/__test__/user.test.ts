import { User } from "../user";

it('implements optimistic concurrency control', async () => {
    const user = User.build({
        email: 'ayyub@gmail.com',
        password: "password",
        username: "ayyub",
        full_name: "Al Ayyubi Sidik",
        role: "author"
    });
    await user.save();

    const firstInstance = await User.findById(user.id);
    const secondInstance = await User.findById(user.id);

    firstInstance!.set({ full_name: "Messi" });
    secondInstance!.set({ full_name: "Neymar" });

    
    await firstInstance!.save();
    
    try {
        await secondInstance!.save();
    } catch (error) {
        return;
    }

    throw new Error('should not reach this point ');
});

it('increments the version number on multiple saves', async () => {
    const user = User.build({
        email: 'ayyub@gmail.com',
        password: "password",
        username: "ayyub",
        full_name: "Al Ayyubi Sidik",
        role: "author"
    });

    await user.save();
    expect(user.version).toEqual(0);
    await user.save();
    expect(user.version).toEqual(1);
    await user.save();
    expect(user.version).toEqual(2);
});