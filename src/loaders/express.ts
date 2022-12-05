import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { serviceMethodLogger } from '../api/middlewares/logger';

export default ({ app }: { app: express.Application }) => {
    app.get('/health', (req: Request, res: Response) => {
        res.status(200).end();
    });

    app.head('/health', (req: Request, res: Response) => {
        res.status(200).end();  
    });

    app.use(serviceMethodLogger);
    app.use(cors());
    app.use(express.json());
    app.use(config.api.prefix, routes());
}