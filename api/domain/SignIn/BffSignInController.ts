import { BffBaseController } from '../base/BffBaseController';
import { NextApiRequest, NextApiResponse } from "next";
import { BffSignInService } from "./BffSignInService";

export class BffSignInController extends BffBaseController {
  private bffSignInService: BffSignInService;

  constructor(req: NextApiRequest, res: NextApiResponse, bffSignInService: BffSignInService) {
    super(req, res);
    this.bffSignInService = bffSignInService;
  }

  public async signIn() {
    const { username, password } = this.req.body;
    const res = await this.bffSignInService.signIn({ username, password });
    return this.successResponse(res);
  }
}