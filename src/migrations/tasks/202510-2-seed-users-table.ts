import { Insertable, Kysely } from 'kysely';

import { Database } from 'src/clients/mysql/mysql.client';

const tableName = 'Users';

const USERS_SEED = {
  id: 1,
  username: 'renarux',
  firstName: 'Renato',
  lastName: 'Berrocal',
  password: 'test123'
} as unknown as Insertable<Database['Users']>;

export async function up(db: Kysely<Database>): Promise<void> {
  await db.insertInto(tableName).values(USERS_SEED).execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.deleteFrom(tableName).where('id', '=', USERS_SEED.id).execute();
}
