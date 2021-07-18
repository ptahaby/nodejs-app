import { LoginsExpressController } from './express.controller';
import { LoginsFastifyController } from './fastify.controller';
import {USE_FASTIFY} from '../../common/config';

const LoginsController = USE_FASTIFY ? LoginsFastifyController: LoginsExpressController
export { LoginsController };