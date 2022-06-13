import 'reflect-metadata';
import ReadLogFileService from './ReadLogFileService';
import GameUtilsProvider from '../../../shared/container/providers/GameUtils/implementation/GameUtilsProvider';

let readLogFileService: ReadLogFileService;
let gameUtilsProvider: GameUtilsProvider;

describe('ReadLogFile', () => {
  beforeEach(() => {
    gameUtilsProvider = new GameUtilsProvider();
    readLogFileService = new ReadLogFileService(gameUtilsProvider);
  });

  it('Testing empty game', async () => {
    const games = await readLogFileService.execute({
      fileDirec: 'src/modules/game/data/fakes/games_fake1.log',
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
    const games = await readLogFileService.execute({
      fileDirec: 'src/modules/game/data/fakes/games_fake2.log',
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
    const games = await readLogFileService.execute({
      fileDirec: 'src/modules/game/data/fakes/games_fake3.log',
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
