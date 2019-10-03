import config from 'config';
const appConfig = config.get('app');

import { ApolloServer } from 'apollo-server-express';
import { schema } from '../graphql/schema';

export default class GraphQLServer {

    static create() {
        return new ApolloServer({
            schema,
            context: async ({ req, connection }) => {
                // if(connection ) {
                //     return connection.context;
                // } else {
                //     const token = req.header.authorization || "";
                //     return token;
                // }
                //user: req.user,
                //token: req.get('Authorization'), // if have another header parameter like token can add after this line..
            },
            // Initialize engine with your API key
            engine: {
                apiKey: appConfig.apollo, // change for graphql server monitor..
                origins: [
                    {
                        requestTimeout: '60s',
                    },
                ],
            },
            // TODO ADDING SOMETHING FOR SUBSCRIPTION ...
            subscriptions: {
                onConnect:  (connectionParams, webSocket, context) => {
                    // return {
                    //     user: {
                    //         name: "bangkit"
                    //     }
                    // }
                    // console.log(connectionParams, webSocket, context);
                    // console.log('context', context)
                },
                onDisconnect: (webSocket, context) => {
                    // console.log('disconnect', webSocket, context);
                },
            }
        });

    }
}
