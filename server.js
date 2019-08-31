const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const authMiddleware = require('./auth-middleware.js');
const customRoutes = require('./custom-routes.js');
const customFetch = require('./custom-fetch.js');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(authMiddleware);
server.use(customFetch);

server.use(jsonServer.rewriter(customRoutes))
server.use(router);

server.listen(port);