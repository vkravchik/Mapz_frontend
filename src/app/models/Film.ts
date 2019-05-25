import {Genre} from './Genre';

export class Film {
  id: number;
  name: string;
  description: string;
  url: string;
  genres: Genre[];
}
