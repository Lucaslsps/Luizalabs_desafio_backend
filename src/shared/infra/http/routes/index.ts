import { Router } from 'express';
import gameRoutes from '../../../../modules/game/infra/http/routes/game.routes';

const routes = Router();

routes.use('/v1/game', gameRoutes);

export default routes;
