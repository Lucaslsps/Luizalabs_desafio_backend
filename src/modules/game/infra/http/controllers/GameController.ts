import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ReadLogFileService from '@modules/game/services/ReadLogFileService';

export default class GameController {
  public async read(request: Request, response: Response): Promise<Response> {
    const readLogFileService = container.resolve(ReadLogFileService);
    const games = await readLogFileService.execute();

    return response.json(games);
  }
}
