import {Ticket} from './Ticket';
import {User} from './User';

export class PurchasedTicket {
  id: number;
  ticket: Ticket;
  user: User;
  status: boolean;
}
