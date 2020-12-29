import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects
} from "@buchutickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
