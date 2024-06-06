import { Publisher, Subjects, CategoryCreatedEvent } from '@alayyubisidikblog/common';

export class CategoryCreatedPublisher extends Publisher<CategoryCreatedEvent> {
    subject: Subjects.CategoryCreated = Subjects.CategoryCreated;
} 