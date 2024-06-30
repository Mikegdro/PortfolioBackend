import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db, connection } from './index'

import dotenv from 'dotenv'

dotenv.config()

const main = async () => {
  await migrate(db, { migrationsFolder: './src/db/migrations' })

  await connection.end()
}

main()
