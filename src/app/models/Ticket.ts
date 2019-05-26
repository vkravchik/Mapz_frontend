import {Film} from './Film';
import {Hall} from './Hall';

export class Ticket {
  id: number;
  film: Film;
  hall: Hall;
  date: string;
  time: string;
}
