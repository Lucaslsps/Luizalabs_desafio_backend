import IGameStorage from './IGameStorage';

export default interface INewPlayerLoggedIn {
  currentLine: string;
  gameStorage: IGameStorage[];
  gameCounter: number;
}
