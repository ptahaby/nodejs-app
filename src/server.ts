import { createConnection } from 'typeorm';
import { PORT } from './common/config';
import app from './app';

createConnection().then(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}).catch(error => console.error(error));


