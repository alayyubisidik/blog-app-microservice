import { Publisher, Subjects, CategoryDeletedEvent } from '@alayyubisidikblog/common';

export class CategoryDeletedPublisher extends Publisher<CategoryDeletedEvent> {
    subject: Subjects.CategoryDeleted = Subjects.CategoryDeleted;
} 