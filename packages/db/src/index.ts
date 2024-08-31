import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type {  } from "drizzle-orm/postgres-js";
import type { ExtractTablesWithRelations} from "drizzle-orm";
import { sql } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";

// see: https://zenn.dev/smallstall/articles/596d3981984587

type QueryInTransaction<T> = (
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) => Promise<T>;

export function createDBClient (
  databaseUser: string,
  databasePassword: string,
  databaseUrl: string,
) {
  const connectionString = `postgres://${databaseUser}:${databasePassword}@${databaseUrl}`;

  const client = postgres(connectionString, { prepare: false });
  const db =  drizzle(client);
  
  const rlsQuery = async <T>(
  userId: string,
  txFunc: QueryInTransaction<T>
) =>
  await db.transaction(async (tx) => {
    await tx.execute(
      sql`SELECT set_config('request.jwt.claim.sub', '${sql.raw(
        userId
      )}', TRUE)`
    );
    

    return await txFunc(tx);
  });

  return rlsQuery;
}

// 別パッケージで使用するものをexport
export * as drizzle from "drizzle-orm";
export * as pgcore from "drizzle-orm/pg-core";