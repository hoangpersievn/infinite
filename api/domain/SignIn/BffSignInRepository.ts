import { TCredentials, User } from '@/api/mock/data/users';

export class BffSignInRepository {
  private client: typeof User;

  constructor(client: typeof User) {
    this.client = client;
  }

  async signIn({ username, password }: TCredentials) {
    return this.client.authenticate({ username, password });
  }
}