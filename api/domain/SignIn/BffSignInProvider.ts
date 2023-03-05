import { NextApiRequest, NextApiResponse } from 'next';
import { BffSignInRepository } from './BffSignInRepository';
import { User } from "@/api/mock/data/users"
import { BffSignInService } from './BffSignInService';
import { BffSignInController } from './BffSignInController';

export function createBffSignInController (req: NextApiRequest, res: NextApiResponse) {
  const bffRepository = new BffSignInRepository(User);
  const bffService = new BffSignInService(bffRepository);
  const bffController = new BffSignInController(req, res, bffService);

  return bffController;
}