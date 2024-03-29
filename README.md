## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


### Docker run

1.  install docker-compose v(1.29.2)
    install  docker v(version 19.03.11)

2. Run from root folder:

 sudo docker-compose build 
 sudo docker-compose up

 3. Repositories:

 https://hub.docker.com/repository/docker/ptaha005/nodejs_app
 https://hub.docker.com/repository/docker/ptaha005/nodejs_psql

 ### Migration run 


 1. npm install
 2. create data base `course`
 3. run command:
 
 ```
 ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run
 ```
4. npm start
