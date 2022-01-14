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
        const lineSplitByBlankSpaceFiltered = line
          .split(' ')
          .filter((splitLine) => splitLine !== '');

        const currentLineAction = lineSplitByBlankSpaceFiltered[1];

        if (currentLineAction === 'InitGame:') {
          gameCounter++;
          const newGameName = `game_${gameCounter}`;
          games[newGameName] = { total_kills: 0, players: [], kills: {} };
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
          const playerKiller = line.split(': ')[2].split(' killed ')[0];
          const playerKilled = line
            .split(': ')[2]
            .split(' killed ')[1]
            .split(' by ')[0];

          const isWorldTheKiller = playerKiller === '<world>' ? true : false;

          if (playerKiller !== playerKilled) {
            currentGame.total_kills++;
            if (isWorldTheKiller) {
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
