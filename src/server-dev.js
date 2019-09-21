import { startAppServer } from './server-app';

let appServer;

function startServers() {
    if (appServer) {
        appServer.listeningApp.close();
    }

    appServer = startAppServer();
}

startServers();
