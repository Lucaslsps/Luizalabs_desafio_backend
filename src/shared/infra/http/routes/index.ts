import { Router } from 'express';
import gameRoutes from '@modules/game/infra/http/routes/game.routes';
import HealthRouter from '@modules/health/infra/http/routes/health.routes';

const routes = Router();

routes.use('/v1/game', gameRoutes);
routes.use('/v1/health', HealthRouter);

export default routes;
