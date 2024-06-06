import { Publisher, Subjects, CategoryUpdatedEvent } from '@alayyubisidikblog/common';

export class CategoryUpdatedPublisher extends Publisher<CategoryUpdatedEvent> {
    subject: Subjects.CategoryUpdated = Subjects.CategoryUpdated;
} 