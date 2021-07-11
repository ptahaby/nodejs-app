import { BoardsExpressController } from './express.controller';
import { BoardsFastifyController } from './fastify.controller';
import {USE_FASTIFY} from '../../common/config';

const BoardsController = USE_FASTIFY ? BoardsFastifyController: BoardsExpressController
export { BoardsController };