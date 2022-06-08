import { Request, Response } from 'express';

export default class UsersController {
  public async health(request: Request, response: Response): Promise<Response> {
    return response.json({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: new Date(),
    });
  }
}
