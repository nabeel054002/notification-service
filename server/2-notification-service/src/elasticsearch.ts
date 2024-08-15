import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@notifications/config';
import { winstonLogger } from '@nabeel054002/jobber-library';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
  auth: {
    username: 'kibana_system',
    password: 'kibana'
  }
});

export async function checkConnection(): Promise<void> {
  let isConnected = false;
  while (!isConnected) {
    console.log('in the while loop')
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      // log.info(`NotificationService Elasticsearch health status - ${health.status}`);
      console.log('health status', health)
      isConnected = true;
    } catch (error) {
      log.error('Connection to Elasticsearch failed. Retrying...');
      // log.log('error', 'NotificationService checkConnection() method:', error);
      console.log('error in the health', error)
      break;
    }
  }
}
