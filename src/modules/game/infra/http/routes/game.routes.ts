import { Router } from 'express';

import GameController from '../controllers/GameController';

const gameRouter = Router();
const gameController = new GameController();

gameRouter.get('/', gameController.read);

export default gameRouter;
