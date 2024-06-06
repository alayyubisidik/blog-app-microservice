import { Publisher, Subjects, UserCreatedEvent } from "@alayyubisidikblog/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
}