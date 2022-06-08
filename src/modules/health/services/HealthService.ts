import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class HealthService {
  constructor() {}

  async execute(): Promise<void> {}
}
export default HealthService;
