import IGameStorage from './IGameStorage';

export default interface ICreateNewGame {
  gameCounter: number;
  gameStorage: IGameStorage[];
}
