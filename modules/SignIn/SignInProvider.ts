import { SignInService } from './SignInService';
import { SignInRepository } from './SignInRepository';
import { client } from '@/core/httpClient';

export function createSignInService(){
  const repository = new SignInRepository(client);
  const service = new SignInService(repository);
  return service;
}