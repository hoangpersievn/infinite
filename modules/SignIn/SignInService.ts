import useMutation from 'swr/mutation';
import { TCredentials } from '@/components/Templates/Auth';
import { SignInRepository } from './SignInRepository';
import { client } from '@/core/httpClient';

export class SignInService {
  private signInRepository: SignInRepository;
  private fetcher;

  constructor(signInRepository: SignInRepository) {
    this.signInRepository = signInRepository;

    this.fetcher = (url: string, { arg }: Record<string, string>) => {
      const credentials = { ...arg as Object } as TCredentials;
      return this.signInRepository.signIn(url, credentials);
    }
  }

  public useSignIn() {
    const { isMutating, data, trigger } = useMutation('api/auth/login', this.fetcher);
    return { data, isLoading: isMutating, mutate: trigger };
  }
}