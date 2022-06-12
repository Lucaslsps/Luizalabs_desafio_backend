import log4js from 'log4js';

log4js.configure({
  appenders: { game: { type: 'file', filename: 'game.log' } },
  categories: { default: { appenders: ['game'], level: 'trace' } },
});

const logger = log4js.getLogger('game');

export default logger;
