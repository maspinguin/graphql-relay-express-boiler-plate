// import express config
import ExpressServer from './server/ExpressServer';
import GraphQLServer from './server/GraphQLServer';
const http = require('http');

// const or variable
const APP_PORT = process.env.PORT || 8080;
const SOCKET_PORT = 8081;
const graphqlServer = GraphQLServer.create();


export function startAppServer(callback) {
    const app = ExpressServer.app();

    // define http server for web socket
    const httpServer = http.createServer(app);


    // define server and apply it before enforceAuthentication middleware
    graphqlServer.applyMiddleware({
        app,
        path: '/graphql',
        cors: ExpressServer.corsOptions
    });

    // install http socket inside Apollo GraphQL server
    graphqlServer.installSubscriptionHandlers(httpServer);

    //ERROR HANDLER. MUST BE THE LAST ENTRY
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });


    // listen server
    return httpServer.listen({
        port: APP_PORT,
    });
}
