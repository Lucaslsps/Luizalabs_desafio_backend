import ReadLogFileService from './ReadLogFileService';

describe('ReadLogFile', () => {
  it('Testing empty game', async () => {
    const games = await ReadLogFileService({
      fileDirec: 'src/logs/fakes/games_fake1.log',
    });

    expect(games).toMatchObject({
      game_1: {
        total_kills: 0,
        players: ['Isgalamido'],
        kills: {},
      },
    });
  });

  it('Testing normal game', async () => {
    const games = await ReadLogFileService({
      fileDirec: 'src/logs/fakes/games_fake2.log',
    });

    expect(games).toMatchObject({
      game_1: {
        total_kills: 9,
        players: ['Isgalamido', 'Dono da Bola', 'Mocinha'],
        kills: {
          Isgalamido: 0,
        },
      },
    });
  });

  it('Testing two games', async () => {
    const games = await ReadLogFileService({
      fileDirec: 'src/logs/fakes/games_fake3.log',
    });

    expect(games).toMatchObject({
      game_1: {
        total_kills: 0,
        players: ['Isgalamido'],
        kills: {},
      },
      game_2: {
        total_kills: 9,
        players: ['Isgalamido', 'Dono da Bola', 'Mocinha'],
        kills: {
          Isgalamido: 0,
        },
      },
    });
  });
});
