import ICreateNewGame from '../interfaces/ICreateNewGame';
import INewPlayerLoggedIn from '../interfaces/INewPlayerLoggedIn';
import IHandleKills from '../interfaces/IHandleKills';
import IGameUtilsProvider from '../models/IGameUtilsProvider';
import IGameStorage from '../interfaces/IGameStorage';

class GameUtilsProvider implements IGameUtilsProvider {
  public getLineAction(currentLine: string): string {
    const lineSplitByBlankSpaceFiltered = currentLine
      .split(' ')
      .filter((splitLine: string) => splitLine !== '');

    const currentLineAction = lineSplitByBlankSpaceFiltered[1];
    return currentLineAction;
  }

  public setNewPlayerLoggedIn({
    currentLine,
    gameStorage,
    gameCounter,
  }: INewPlayerLoggedIn): void {
    const currentGame: IGame = gameStorage[`game_${gameCounter}`];
    const currentGamePlayers = currentGame.players;
    const playerLoggedIn = currentLine.split('n\\')[1].split('\\')[0];

    currentGamePlayers.find((player) => player === playerLoggedIn)
      ? ''
      : currentGamePlayers.push(playerLoggedIn);
  }

  public createNewGame({ gameCounter, gameStorage }: ICreateNewGame): void {
    const newGameName = `game_${gameCounter}`;
    gameStorage[newGameName] = {
      total_kills: 0,
      players: [],
      kills: {},
    };
  }

  public handleKills({
    gameStorage,
    currentLine,
    gameCounter,
  }: IHandleKills): void {
    const currentGame: IGame = gameStorage[`game_${gameCounter}`];
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
        if (playerKilledKills === undefined) {
          currentGame.kills[playerKilled] = 0;
        } else if (playerKilledKills === 0) {
        } else {
          currentGame.kills[playerKilled] = playerKilledKills - 1;
        }
      } else {
        currentGame.kills[playerKiller] =
          currentGame.kills[playerKiller] + 1 || 1;
      }
    }
  }
  public parseGameStorageToJson(gameStorage: IGameStorage[]) {
    const gamesToJson = {};
    Object.keys(gameStorage).forEach(
      (game) => (gamesToJson[game] = gameStorage[game])
    );

    return gamesToJson;
  }
}

export default GameUtilsProvider;
