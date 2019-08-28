const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const authMiddleware = require('./auth-middleware.js');
const customRoutes = require('./custom-routes.js').default;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(authMiddleware);

server.use(jsonServer.rewriter(customRoutes))
server.use(router);

server.listen(port);