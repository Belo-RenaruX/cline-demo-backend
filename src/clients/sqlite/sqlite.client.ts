import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import { join } from 'path';

import { UserDM } from 'src/entities/dms/user.dm';
import { LoggerClient } from 'src/clients/logger/logger.client';
import { EnvHelper } from 'src/helpers/env.helper';

export interface Database {
  Users: UserDM;
}

class KyselyLogger {
  private static readonly logger = LoggerClient.instance;

  static logQuery(event: any): void {
    this.logger.info('SQL Query Executed', {
      query: event.query.sql,
      parameters: event.query.parameters,
    });
  }

  static logQueryError(event: any): void {
    this.logger.error('SQL Query Failed', {
      query: event.query.sql,
      parameters: event.query.parameters,
      error: event.error,
    });
  }
}


export class SqliteClient {
  static readonly instance: SqliteClient = new SqliteClient();
  private readonly db: Kysely<Database>;
  private readonly dbPath: string;

  private constructor() {
    this.dbPath = EnvHelper.getOptional('DB_PATH') || join(process.cwd(), 'database.sqlite');
    
    const dialect = new SqliteDialect({
      database: new Database(this.dbPath)
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
