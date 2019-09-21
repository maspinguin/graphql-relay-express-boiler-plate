import express from 'express';

export default class ExpressServer {

    static corsOptions = {
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
    };

    static app() {
        let app = express();
        return app;
    }
}
