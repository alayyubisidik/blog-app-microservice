import mongoose from "mongoose";
import { User } from "../user";

const createUser = async () => {
    const user = User.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        username: "test",
        full_name: "test"
    });

    await user.save();

    return user;
}

it('implements optimistic concurrency control', async () => {
    const user = await createUser();

    const firstInstance = await User.findById(user.id);
    const secondInstance = await User.findById(user.id);

    firstInstance!.set({ full_name: "update1" });
    secondInstance!.set({ full_name: "update2" });
    
    await firstInstance!.save();
    
    try {
        await secondInstance!.save();
    } catch (error) {
        return;
    }

    throw new Error('should not reach this point ');
});

it('increments the version number on multiple saves', async () => {
    const user = await createUser();

    expect(user.version).toEqual(0);
    await user.save();
    expect(user.version).toEqual(1);
    await user.save();
    expect(user.version).toEqual(2);
});