import { Publisher, OrderCreatedEvent, Subjects } from '@buchutickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
