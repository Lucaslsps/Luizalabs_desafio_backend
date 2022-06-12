export default {
  appenders: { game: { type: 'file', filename: 'game.log' } },
  categories: { default: { appenders: ['game'], level: 'trace' } },
};
