import ICreateNewGame from '../interfaces/ICreateNewGame';
import IGameStorage from '../interfaces/IGameStorage';
import IHandleKills from '../interfaces/IHandleKills';
import INewPlayerLoggedIn from '../interfaces/INewPlayerLoggedIn';

export default interface IGameUtilsProvider {
  getLineAction(currentLine: string): string;
  createNewGame(params: ICreateNewGame): void;
  setNewPlayerLoggedIn(params: INewPlayerLoggedIn): void;
  handleKills(params: IHandleKills): void;
  parseGameStorageToJson(gameStorage: IGameStorage[]): any;
}
