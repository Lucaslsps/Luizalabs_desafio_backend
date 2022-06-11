import fs from 'fs';
import log4js from 'log4js';
import { injectable, inject } from 'tsyringe';
import eventStream from 'event-stream';
import AppError from '@shared/errors/AppError';
import IGameUtilsProvider from '@shared/container/providers/GameUtils/models/IGameUtilsProvider';
import IGameStorage from '@shared/container/providers/GameUtils/interfaces/IGameStorage';

interface IParams {
  fileDirec?: string;
}

@injectable()
class ReadLogFileService {
  private logger = log4js.getLogger('game');
  constructor(
    @inject('GameUtilsProvider')
    private gameUtilsProvider: IGameUtilsProvider
  ) {
    log4js.configure({
      appenders: { game: { type: 'file', filename: 'game.log' } },
      categories: { default: { appenders: ['game'], level: 'trace' } },
    });
  }
  async execute({
    fileDirec = 'src/logs/games.log',
  }: IParams = {}): Promise<IGameStorage> {
    /*
    Creating a promise encapsuling the reading stream
    so that it can be returned and awaited
  */

    const readStream = await new Promise<IGameStorage>((resolve, reject) => {
      let gameStorage = new Map<string, IGame>();
      let gameCounter = 0;

      return fs
        .createReadStream(fileDirec)
        .pipe(eventStream.split())
        .on('data', (currentLine) => {
          const currentLineAction =
            this.gameUtilsProvider.getLineAction(currentLine);

          if (currentLineAction === 'InitGame:') {
            gameCounter++;
            this.gameUtilsProvider.createNewGame({ gameCounter, gameStorage });
          }

          if (currentLineAction === 'ClientUserinfoChanged:') {
            this.gameUtilsProvider.setNewPlayerLoggedIn({
              currentLine,
              gameCounter,
              gameStorage,
            });
          }

          if (currentLineAction === 'Kill:') {
            this.gameUtilsProvider.handleKills({
              currentLine,
              gameCounter,
              gameStorage,
            });
          }
        })
        .on('end', () => {
          const gamesToJson =
            this.gameUtilsProvider.parseGameStorageToJson(gameStorage);

          resolve(gamesToJson);
        });
    });

    this.logger.info(`Game processed`);
    return readStream;
  }
}

export default ReadLogFileService;
