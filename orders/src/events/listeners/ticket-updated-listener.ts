import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@buchutickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./que-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    //send acknowledgement to the nats server that the event has been processed successfully
    msg.ack();
  }
}
