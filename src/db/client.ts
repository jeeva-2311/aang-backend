import { Pool } from "pg";

const requiredEnvVars = ['PG_HOST', 'PG_USER', 'PG_PASSWORD', 'PG_DB', 'PG_PORT'];
const missingVars = requiredEnvVars.filter(key => !process.env[key]);

if (missingVars.length > 0) {
  console.log(missingVars);
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

export const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: Number(process.env.PG_PORT),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxLifetimeSeconds: 60,
});

export const testDbConnection = async () => {
  let client;

  try {
    client = await pool.connect();

    const tzResult = await client.query("SHOW timezone");
    const currentTZ = tzResult.rows[0].TimeZone;
    console.log(`Current PostgreSQL timezone: ${currentTZ}`);

    if (currentTZ.toUpperCase() !== "UTC") {
      console.log("Timezone is not UTC. Applying permanent fix...");
      const dbName = process.env.PG_DB;
      await client.query(`ALTER DATABASE "${dbName}" SET timezone = 'UTC'`);
      console.log(`Database-level timezone set to UTC for '${dbName}'.`);
    }
    const res = await client.query("SELECT NOW()");
    console.log(`Database connection successful: ${res.rows[0].now}`);

    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  } finally {
    if (client) client.release();
  }
};
