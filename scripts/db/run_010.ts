import { readFile } from "node:fs/promises";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const sql = await readFile("db/migrations/010_diagnostic_questions.sql", "utf8");
  try {
    await pool.query(sql);
    console.log("010 applied successfully");
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
main();
