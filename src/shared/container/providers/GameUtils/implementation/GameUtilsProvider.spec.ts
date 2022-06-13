import 'reflect-metadata';
import GameUtilsProvider from './GameUtilsProvider';

let gameUtilsProvider: GameUtilsProvider;

describe('ReadLogFile', () => {
  beforeEach(() => {
    gameUtilsProvider = new GameUtilsProvider();
  });

  it('Testing empty line action', async () => {
    const lineAction = gameUtilsProvider.getLineAction('');

    expect(lineAction).toMatch('');
  });

  it('Testing Kill line action', async () => {
    const lineAction = gameUtilsProvider.getLineAction(
      '25:05 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT'
    );

    expect(lineAction).toMatch('Kill:');
  });

  it('Testing ClientUserinfoChanged line action', async () => {
    const lineAction = gameUtilsProvider.getLineAction(
      `0:25 ClientUserinfoChanged: 2 nDono da Bola`
    );

    expect(lineAction).toMatch('ClientUserinfoChanged:');
  });

  it('Testing InitGame line action', async () => {
    const lineAction = gameUtilsProvider.getLineAction(
      `0:00 InitGame: sv_floodProtect`
    );

    expect(lineAction).toMatch('InitGame:');
  });

  it('Testing parsing of gameStorage to Json', async () => {
    const gameMap = new Map();
    gameMap.set('game_1', {
      total_kills: 0,
      players: ['Isgalamido'],
      kills: { Isgalamido: 0 },
    });

    const lineAction = gameUtilsProvider.parseGameStorageToJson(gameMap);

    expect(lineAction).toMatchObject({
      game_1: {
        total_kills: 0,
        players: ['Isgalamido'],
        kills: {
          Isgalamido: 0,
        },
      },
    });
  });
});
