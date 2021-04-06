# Assumptions #

The calls are made only to specific IDs and not to the ../courses endpoint. Anything apart from ../courses/${id} is suppose to give a generic error message.

It is assumed that the api call will be not longer than ../courses/{$id}. In case the entered url is ../courses/{$id1}/{$id2}/{$id3}, the last id, i.e. id3 will be taken.

The second commit with description Requirement - 2 consists of requirements 2 as well as 3.

Few other libraries have been installed.

# Installation #

## Server ##
This assumes at least node 10 is installed

```
cd server
```

#### Install ####
```
npm install
```

#### Run back-end tests ####
```
npm run test                  # alternatively, npm run test:watch for watch mode
```

#### Run the API ####
```
npm start
```

## Client ##
```
cd client
```

#### Install ####
```
npm install
```

#### Run front-end tests ####
```
npm test
```

#### Run the client ####
```
npm start
```
