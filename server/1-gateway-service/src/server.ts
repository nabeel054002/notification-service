import cookieSession from 'cookie-session';
import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
import { Logger } from 'winston';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression'
import { StatusCodes } from 'http-status-codes';

const SERVER_PORT = 4000;
const log: Logger = winstonLogger('', 'apiGatewayServer', 'debug');


export class GatewayServer {
    private app: Application;
    
    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        console.log('API Gateway Started')
    }

    private securityMiddleware(app: Application): void {
        app.set('trust proxy', 1);
        app.use(
            cookieSession({
                name: 'session',
                keys: [],
                maxAge: 24 * 7 * 3600000,
                secure: false // update from config
                // sameSite: none // for now; sameSite prevents CSRF
            })
        )
        app.use(hpp());
        app.use(helmet());
        app.use(cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }

    private standardMiddleware(app: Application): void {
        app.use(compression());
        app.use(json({ limit: '200mb' }));
        app.use(urlencoded({ extended: true, limit: '200mb' }));
    }
    
    private routesMiddleware(app: Application): void {
        appRoutes(app);
    }

    private startElasticSearch(): void {
        elasticSearch.checkConnection();
    }

    private errorHandler(app: Application): void {
        app.use('*', (req: Request, res: Response, next: NextFunction) => {
            const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            log.log('error', `${fullUrl} endpoint does not exist.`, '');
            res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.'});
            next();
        });
    
        app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
            if (error instanceof CustomError) {
                log.log('error', `GatewayService ${error.comingFrom}:`, error);
                res.status(error.statusCode).json(error.serializeErrors());
            }
    
        //   if (isAxiosError(error)) {
        //     log.log('error', `GatewayService Axios Error - ${error?.response?.data?.comingFrom}:`, error);
        //     res.status(error?.response?.data?.statusCode ?? DEFAULT_ERROR_CODE).json({ message: error?.response?.data?.message ?? 'Error occurred.' });
        //   }
    
            next();
        });
    }

    private async startSever(app: )
}