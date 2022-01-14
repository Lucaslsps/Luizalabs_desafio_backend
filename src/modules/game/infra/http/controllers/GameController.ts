import { Request, Response } from 'express';
import ReadLogFileService from '../../../services/ReadLogFileService';
export default class GameController {
  public async read(request: Request, response: Response): Promise<Response> {
    const games = await ReadLogFileService();

    return response.json(games);
  }
}
