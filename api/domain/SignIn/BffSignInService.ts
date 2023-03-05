import { TCredentials } from '@/api/mock/data/users';
import { BffSignInRepository } from "./BffSignInRepository";

export class BffSignInService {
  private bffSignInRepository: BffSignInRepository;

  constructor(bffSignInRepository: BffSignInRepository) {
    this.bffSignInRepository = bffSignInRepository;
  }

  async signIn({ username, password }: TCredentials) {
    const res = await this.bffSignInRepository.signIn({ username, password });
    // Should translate here
    return res;
  }
};