import { Listener, OrderCancelledEvent, Subjects } from "@buchutickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/tickets-updated-publisher";
import { queueGroupName } from "./que-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    //find the ticket
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) throw new Error("Ticker not found");

    ticket.set({ orderId: undefined });
    await ticket.save();
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version
    });

    msg.ack();
  }
}
