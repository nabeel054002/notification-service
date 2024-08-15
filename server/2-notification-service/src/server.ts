import 'express-async-errors';
import http from 'http';

// import { winstonLogger } from '@nabeel054002/jobber-library';
// import { Logger } from 'winston';
// import { config } from '@notifications/config';
import { Application } from 'express';
import { healthRoutes } from '@notifications/routes';
import { checkConnection } from '@notifications/elasticsearch'

const SERVER_PORT = 4001;
// const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
  startServer(app);
  // wont have the apigateway path
  app.use('', healthRoutes());
  startQueues();
  startElasticSearch();
  console.log('server started!')
}

async function startQueues(): Promise<void> {
  // rewrite stuff here
}

function startElasticSearch(): void {
  checkConnection();
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    // log.info(`Worker with process id of ${process.pid} on notification server has started`); // process is a js api, context: process.env usage
    httpServer.listen(SERVER_PORT, () => {
      console.log('sdfsdfsdf 35')
      // log.info(`Notification server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    // log.log('error', 'NotificationService startServer() method:', error);
    console.log('error in server.ts', error)
  }
}
