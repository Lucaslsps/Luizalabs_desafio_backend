import IGameStorage from './IGameStorage';

export default interface IHandleKills {
  gameStorage: IGameStorage[];
  currentLine: string;
  gameCounter: number;
}
