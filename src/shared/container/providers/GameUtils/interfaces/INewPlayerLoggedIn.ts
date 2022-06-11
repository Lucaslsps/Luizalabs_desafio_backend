import IGameStorage from './IGameStorage';

export default interface INewPlayerLoggedIn {
  currentLine: string;
  gameStorage: Map<string, IGame>;
  gameCounter: number;
}
