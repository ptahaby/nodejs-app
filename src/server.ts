import { PORT } from './common/config';
import bootstrap from './app';


async function server() {
  const app = await bootstrap();
  await app.listen(PORT || '4000');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

server();


