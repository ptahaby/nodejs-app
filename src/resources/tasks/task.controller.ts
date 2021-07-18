import { TasksExpressController } from './express.controller';
import { TasksFastifyController } from './fastify.controller';
import {USE_FASTIFY} from '../../common/config';

const TasksController = USE_FASTIFY ? TasksFastifyController: TasksExpressController
export { TasksController };