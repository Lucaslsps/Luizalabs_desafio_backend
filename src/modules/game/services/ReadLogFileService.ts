import fs from 'fs';
import eventStream from 'event-stream';

interface IGameStorage {
  [game: string]: IGame;
}
interface IGame {
  total_kills: number;
  players: string[];
  kills: IKill;
}

interface IKill {
  [player: string]: number;
}

async function ReadLogFileService(): Promise<any> {
  const games = [] as IGameStorage[];
  let gameCounter = 0;

  fs.createReadStream('src/logs/games.log')
    .pipe(eventStream.split())
    .pipe(
      eventStream.mapSync((line: string) => {
        const lineSplitByBlankSpace = line.split(' ');
        const currentLineAction = lineSplitByBlankSpace[3];

        if (currentLineAction === 'InitGame:') {
          gameCounter++;
          const newGameName = `game_${gameCounter}`;
          games[newGameName] = { total_kills: 0, players: [], kills: {} };
        }

        if (currentLineAction === 'Kill:') {
          const currentGame: IGame = games[`game_${gameCounter}`];
          const currentGamePlayers = currentGame.players;
          const playerKiller = lineSplitByBlankSpace[7];
          const playerKilled = lineSplitByBlankSpace[9];

          currentGame.total_kills++;

          currentGamePlayers.find((player) => player === playerKiller)
            ? ''
            : currentGamePlayers.push(playerKiller);

          currentGamePlayers.find((player) => player === playerKilled)
            ? ''
            : currentGamePlayers.push(playerKilled);

          currentGame.kills[playerKiller] =
            currentGame.kills[playerKiller] + 1 || 1;
        }
      })
    );
}

export default ReadLogFileService;
