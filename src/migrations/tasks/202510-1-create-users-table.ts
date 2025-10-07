import { Kysely, sql } from 'kysely';

import { Database } from 'src/clients/sqlite/sqlite.client';

const tableName = 'Users';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable(tableName)
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('username', 'varchar(255)', (col) => col.notNull())
    .addColumn('firstName', 'varchar(255)', (col) => col.notNull())
    .addColumn('lastName', 'varchar(255)', (col) => col.notNull())
    .addColumn('password', 'varchar(255)', (col) => col.notNull())
    .addColumn('createdAt', 'datetime', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updatedAt', 'datetime', (col) =>
      col
        .notNull()
        .defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema.createIndex('IndexUsername').on(tableName).column('username').unique().execute();
  await db.schema.createIndex('IndexPassword').on(tableName).column('password').execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropIndex('IndexUsername').on(tableName).execute();
  await db.schema.dropIndex('IndexPassword').on(tableName).execute();
  await db.schema.dropTable(tableName).execute();
}
