import { Publisher, Subjects, TicketCreatedEvent } from '@buchutickets/common';

export class TickerCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
