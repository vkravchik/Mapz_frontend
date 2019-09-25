export class Genre {
  id: number;
  name: string;

  public clone(): this {
    const clone = Object.create(this);

    return clone;
  }
}
