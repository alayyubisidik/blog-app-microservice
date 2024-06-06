import mongoose from 'mongoose';
import { Password } from '../services/password';
import { updateIfCurrentPlugin } from "mongoose-update-if-current"; 

interface UserAttrs {
    email: string;
    password: string;
    username: string;
    full_name: string;
    role: string;
}

interface UserDoc extends mongoose.Document {
    email: string
    password: string;
    username: string;
    full_name: string;
    role: string;
    created_at: Date;
    access_status: Boolean;
    version: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    username: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    access_status: {
        type: Boolean,
        required: true,
        default: true
    },
    created_at: {
        type: Date,
        required: true,
        default : Date.now
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        }
    }
});

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

