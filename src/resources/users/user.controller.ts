import {UsersExpressController} from './express.controlelr';
import { UsersFastifyController} from './fatify.controller';
import {USE_FASTIFY} from '../../common/config';

const UsersController = USE_FASTIFY ? UsersFastifyController: UsersExpressController
export { UsersController };