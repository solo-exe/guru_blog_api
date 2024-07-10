import * as express from "express";
import { Request, Response, NextFunction } from "express"
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

import { AuthenticatedRequest } from './src/types';
import * as Errors from './src/services/Errors';
import routes from './src/routes';
import setup from './src/config';
import AppDataSource from './src/models/index';

const config = setup()
const messages = config.messages

const app = express()

app.use(cors());

// SET MAX PAYLOAD SIZE 
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use('/health', (_, res) => res.sendStatus(200))
app.use("/", routes);

app.use((req: Request, res: Response) => res.status(404).send({ status: "error", message: messages[404] }))

app.use((err: Error, req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!res.headersSent) {
        if (err instanceof Errors.BaseError) {
            return res.status(err.code).json({
                success: false, status: "error",
                message: err.message,
                ...(err?.data ? { data: err.data } : {})
            })
        }
        console.log('ROOT FILE ERROR', err);
        return res.status(500).send({ success: false, message: messages[500] });
    }
});

const initializeDBConnection = async () => {
    try {
        await AppDataSource.initialize()
        console.log('Connected to database')
    } catch (error) {
        console.log('DB CONNECTION ERROR', error)
        throw new Errors.ServerError('Unable to connect to database')
    }
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await initializeDBConnection()
    console.log(`Listening on port ${PORT}...`)
})