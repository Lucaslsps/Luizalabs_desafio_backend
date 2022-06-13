import log4js from 'log4js';

import ICreateNewGame from '../interfaces/ICreateNewGame';
import INewPlayerLoggedIn from '../interfaces/INewPlayerLoggedIn';
import IHandleKills from '../interfaces/IHandleKills';
import IGameUtilsProvider from '../models/IGameUtilsProvider';
import IGameStorage from '../interfaces/IGameStorage';

class GameUtilsProvider implements IGameUtilsProvider {
  private logger = log4js.getLogger('game');

  constructor() {
    log4js.configure({
      appenders: { game: { type: 'file', filename: 'game.log' } },
      categories: { default: { appenders: ['game'], level: 'trace' } },
    });
  }

  public getLineAction(currentLine: string): string {
    const lineSplitByBlankSpaceFiltered = currentLine
      .split(' ')
      .filter((splitLine: string) => splitLine !== '');

    const currentLineAction = lineSplitByBlankSpaceFiltered[1];
    if (!currentLineAction) {
      return '';
    }

    return currentLineAction;
  }

  public setNewPlayerLoggedIn({
    currentLine,
    gameStorage,
    gameCounter,
  }: INewPlayerLoggedIn): void {
    const currentGame: IGame | undefined = gameStorage.get(
      `game_${gameCounter}`
    );
    if (!currentGame) return;
    const currentGamePlayers = currentGame.players;
    const playerLoggedIn = currentLine.split('n\\')[1].split('\\')[0];

    if (!currentGamePlayers.find((player) => player === playerLoggedIn)) {
      currentGamePlayers.push(playerLoggedIn);
      currentGame.kills[playerLoggedIn] = 0;
    }
  }

  public createNewGame({ gameCounter, gameStorage }: ICreateNewGame): void {
    const newGameName = `game_${gameCounter}`;
    gameStorage.set(newGameName, {
      total_kills: 0,
      players: [],
      kills: {},
    });
  }

  public handleKills({
    gameStorage,
    currentLine,
    gameCounter,
  }: IHandleKills): void {
    const currentGame: IGame | undefined = gameStorage.get(
      `game_${gameCounter}`
    );
    if (!currentGame) return;
    const playerKiller = currentLine.split(': ')[2].split(' killed ')[0];
    const playerKilled = currentLine
      .split(': ')[2]
      .split(' killed ')[1]
      .split(' by ')[0];

    const isWorldTheKiller = playerKiller === '<world>' ? true : false;

    if (playerKiller !== playerKilled) {
      currentGame.total_kills++;
      if (isWorldTheKiller) {
        /*
          This part makes it not possible
          to have negative kills when
          the world kills the player
        */
        let playerKilledKills = currentGame.kills[playerKilled];
        if (playerKilledKills > 0) {
          currentGame.kills[playerKilled] = playerKilledKills - 1;
        }
      } else {
        currentGame.kills[playerKiller] =
          currentGame.kills[playerKiller] + 1 || 1;
      }
    }
  }

  public parseGameStorageToJson(gameStorage: Map<string, IGame>): IGameStorage {
    const gamesToJson: IGameStorage = {};
    for (let key of gameStorage.keys()) {
      let game = gameStorage.get(key);
      if (game) {
        gamesToJson[key] = game;
      }
    }

    return gamesToJson;
  }
}

export default GameUtilsProvider;
