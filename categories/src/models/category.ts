import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current"; 

interface CategoryAttrs {
    name: string;
    slug: string
}

interface CategoryDoc extends mongoose.Document {
    name: string;
    slug: string
    version: number;
}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
    build(attrs: CategoryAttrs): CategoryDoc;
}

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

categorySchema.set('versionKey', 'version');
categorySchema.plugin(updateIfCurrentPlugin);

categorySchema.statics.build = (attrs: CategoryAttrs) => {
    return new Category(attrs);
}

const Category = mongoose.model<CategoryDoc, CategoryModel>('Category', categorySchema);

export { Category };
