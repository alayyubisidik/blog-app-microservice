import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { UserDoc } from "./user";
import { CategoryDoc } from "./category";

interface PostAttrs {
    title: string;
    slug: string;
    content: string;
    user: UserDoc
    category: CategoryDoc;
}

interface PostDoc extends mongoose.Document {
    title: string;
    slug: string;
    content: string;
    user: UserDoc
    category: CategoryDoc;
    created_at: Date;
    version: number;
}

interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id,
            delete ret._id;
        }
    }
});

postSchema.set('versionKey', 'version');
postSchema.plugin(updateIfCurrentPlugin);

postSchema.statics.build = (attrs: PostAttrs) => {
    return new Post(attrs);
}

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };

