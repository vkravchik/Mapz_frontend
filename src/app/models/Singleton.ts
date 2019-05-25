export class Singleton {
  private static instance: Singleton;
  public token: String;

  private constructor(token: String) {
    this.token = token;
    localStorage.setItem('token', token.toString());
  }

  public static getInstance(token: String): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(token);
    }

    return Singleton.instance;
  }
}
