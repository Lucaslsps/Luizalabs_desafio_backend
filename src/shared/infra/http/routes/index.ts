import { Router } from 'express';
import gameRoutes from '@modules/game/infra/http/routes/game.routes';
import HealthRouter from '@modules/health/infra/http/routes/health.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

const routes = Router();

routes.use('/v1/game', gameRoutes);
routes.use('/v1/health', HealthRouter);
routes.use('/v1/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default routes;
