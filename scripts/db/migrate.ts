import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

import { Pool } from "pg"

async function main() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for db:migrate")
  }

  const pool = new Pool({ connectionString: databaseUrl })

  try {
    await pool.query(`
      create table if not exists schema_migrations (
        version text primary key,
        applied_at timestamptz not null default now()
      )
    `)

    const migrationsDir = path.resolve(process.cwd(), "db/migrations")
    const migrationFiles = (await readdir(migrationsDir))
      .filter((file) => file.endsWith(".sql"))
      .sort()

    for (const file of migrationFiles) {
      const alreadyApplied = await pool.query<{ version: string }>(
        "select version from schema_migrations where version = $1",
        [file]
      )

      if (alreadyApplied.rowCount) {
        console.log(`skip ${file}`)
        continue
      }

      const sql = await readFile(path.join(migrationsDir, file), "utf8")
      await pool.query("begin")

      try {
        await pool.query(sql)
        await pool.query("insert into schema_migrations (version) values ($1)", [file])
        await pool.query("commit")
        console.log(`applied ${file}`)
      } catch (error) {
        await pool.query("rollback")
        throw error
      }
    }
  } finally {
    await pool.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
