import { Publisher, Subjects, UserUpdatedEvent } from "@alayyubisidikblog/common";

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
}