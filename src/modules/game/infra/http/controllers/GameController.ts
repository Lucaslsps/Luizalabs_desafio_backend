import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ReadLogFileService from '../../../services/ReadLogFileService'
export default class GameController {

    public async read(
      request: Request,
      response: Response
    ): Promise<Response> {
      await ReadLogFileService()

      return response.json();
    }
  }