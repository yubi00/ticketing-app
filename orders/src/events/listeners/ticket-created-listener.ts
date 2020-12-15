import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@buchutickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './que-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price
    });
    await ticket.save();

    //send acknowledgement to the nats server that the event has been processed successfully
    msg.ack();
  }
}
