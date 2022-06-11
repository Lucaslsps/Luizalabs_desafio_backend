import { container } from 'tsyringe';
import GameUtilsProvider from './implementation/GameUtilsProvider';
import IGameUtilsProvider from './models/IGameUtilsProvider';

container.registerSingleton<IGameUtilsProvider>(
  'GameUtilsProvider',
  GameUtilsProvider
);
