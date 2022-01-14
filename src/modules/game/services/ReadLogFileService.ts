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
  const readStream = new Promise<any>((resolve, reject) => {
    const games = [] as IGameStorage[];
    let gameCounter = 0;
    return fs
      .createReadStream('src/logs/games.log')
      .pipe(eventStream.split())
      .on('data', (line) => {
        const lineSplitByBlankSpace = line
          .split(' ')
          .filter((splitLine) => splitLine !== '');

        const currentLineAction = lineSplitByBlankSpace[1];

        if (currentLineAction === 'InitGame:') {
          gameCounter++;
          const newGameName = `game_${gameCounter}`;
          games[newGameName] = { total_kills: 0, players: [], kills: {} };
          //console.log(line);
        }

        if (currentLineAction === 'ClientUserinfoChanged:') {
          const currentGame: IGame = games[`game_${gameCounter}`];
          const currentGamePlayers = currentGame.players;
          const playerLoggedIn = line.split('n\\')[1].split('\\')[0];

          currentGamePlayers.find((player) => player === playerLoggedIn)
            ? ''
            : currentGamePlayers.push(playerLoggedIn);
        }

        if (currentLineAction === 'Kill:') {
          const currentGame: IGame = games[`game_${gameCounter}`];
          const currentGamePlayers = currentGame.players;
          const playerKiller = lineSplitByBlankSpace[7];
          const playerKilled = lineSplitByBlankSpace[9];
          const isWorldTheKiller = playerKiller === '<world>' ? true : false;

          currentGame.total_kills++;

          if (!isWorldTheKiller) {
            currentGamePlayers.find((player) => player === playerKiller)
              ? ''
              : currentGamePlayers.push(playerKiller);

            currentGame.kills[playerKiller] =
              currentGame.kills[playerKiller] + 1 || 1;
          } else {
            currentGame.kills[playerKilled] =
              currentGame.kills[playerKilled] - 1 || -1;
          }
        }
      })
      .on('end', () => {
        const gamesToJson = {};
        Object.keys(games).forEach((game) => (gamesToJson[game] = games[game]));
        resolve(gamesToJson);
      });
  });

  return readStream;
}

export default ReadLogFileService;
