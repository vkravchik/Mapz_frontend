export class User {
  id: number;
  username: string;
  password: string;
  accessToken: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
