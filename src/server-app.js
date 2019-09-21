// import express config
import ExpressServer from './server/ExpressServer';
import GraphQLServer from './server/GraphQLServer';

// const or variable
const APP_PORT = process.env.PORT || 8080;
const graphqlServer = GraphQLServer.create();

export function startAppServer(callback) {
    const app = ExpressServer.app();
    // define server and apply it before enforceAuthentication middleware
    graphqlServer.applyMiddleware({
        app,
        path: '/graphql',
        cors: ExpressServer.corsOptions
    });

    //ERROR HANDLER. MUST BE THE LAST ENTRY
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    return app.listen({
        port: APP_PORT,
    });
}
