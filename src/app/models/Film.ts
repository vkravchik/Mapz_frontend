import {Genre} from './Genre';

export class Film {
  id: number;
  name: string;
  description: string;
  url: string;
  genres: Genre[];

  constructor() {
    this.id = null;
    this.name = null;
    this.description = null;
    this.url = null;
    this.genres = null;
  }


}

