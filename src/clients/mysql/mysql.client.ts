import { Kysely, MysqlDialect, ErrorLogEvent, QueryLogEvent, MysqlPool } from 'kysely';
import { createPool } from 'mysql2';

import { UserDM } from 'src/entities/dms/user.dm';
import { LoggerClient } from 'src/clients/logger/logger.client';
import { EnvHelper } from 'src/helpers/env.helper';

export interface Database {
  Users: UserDM;
}

class KyselyLogger {
  private static readonly logger = LoggerClient.instance;

  static logQuery(event: QueryLogEvent): void {
    this.logger.info('SQL Query Executed', {
      query: event.query.sql,
      parameters: event.query.parameters,
    });
  }

  static logQueryError(event: ErrorLogEvent): void {
    this.logger.error('SQL Query Failed', {
      query: event.query.sql,
      parameters: event.query.parameters,
      error: event.error,
    });
  }
}

export class MysqlClient {
  static readonly instance: MysqlClient = new MysqlClient();
  private readonly db: Kysely<Database>;

  private constructor() {
    const dialect = new MysqlDialect({
      pool: createPool({
        host: EnvHelper.get('DB_HOST'),
        user: EnvHelper.get('DB_USER'),
        password: EnvHelper.get('DB_PASSWORD'),
        database: EnvHelper.get('DB_NAME'),
        port: Number(EnvHelper.get('DB_PORT')),
        connectionLimit: 10,
      }) as MysqlPool,
    });

    this.db = new Kysely<Database>({
      dialect,
      log(event) {
        switch (event.level) {
          case 'query':
            KyselyLogger.logQuery(event);
            break;
          case 'error':
            KyselyLogger.logQueryError(event);
            break;
        }
      },
    });
  }

  getDb(): Kysely<Database> {
    return this.db;
  }
}
