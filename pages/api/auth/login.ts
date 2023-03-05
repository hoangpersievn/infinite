import { NextApiRequest, NextApiResponse } from 'next';
import { createBffSignInController } from "@/api/domain/SignIn/BffSignInProvider";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await createBffSignInController(req, res).signIn();
}

