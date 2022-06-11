interface IGame {
  total_kills: number;
  players: string[];
  kills: IKill;
}

interface IKill {
  [player: string]: number;
}
