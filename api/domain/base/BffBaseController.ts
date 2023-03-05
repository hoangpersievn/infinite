import { NextApiRequest, NextApiResponse } from 'next';
export class BffBaseController {
  public req: NextApiRequest;
  public res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  protected successResponse(response: unknown) {
    const statusCode = this.req.method === 'POST' ? 201 : 200;
    return this.res.status(statusCode).json({
      code: statusCode,
      message: 'Successful',
      data: response,
    })
  }
};