import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
    id: string;
    username: string;
    full_name: string;
}

export interface UserDoc extends mongoose.Document {
    username: string;
    full_name: string;
    version: number;
}
 
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
    findByEvent(event: { id: string, version: number }): Promise<UserDoc | null>; 
}
 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true 
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id,
            delete ret._id;
        }
    } 
});

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return User.findOne({
        _id: event.id,
        version: event.version - 1
    });
};

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User({
        _id: attrs.id,
        username: attrs.username,
        full_name: attrs.full_name
    });
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

