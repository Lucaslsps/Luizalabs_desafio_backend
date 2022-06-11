import IGameStorage from './IGameStorage';

export default interface IHandleKills {
  gameStorage: Map<string, IGame>;
  currentLine: string;
  gameCounter: number;
}
