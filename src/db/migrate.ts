import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { connection } from './index'

import { errorHandler } from '../utils'

import { db } from './index'

import dotenv from 'dotenv'

dotenv.config()

export const executeMigrations = async () => {

  console.log(`Executing migrations for: ${process.env.DB_URL}`)
 
  await migrate(db, { migrationsFolder: './src/db/migrations' })
    .then(() => {
      console.log("Migrations succesfully executed")
    }).catch((err) => {
      console.error(errorHandler(err))
      connection.end()
      process.exit(1)
    })

}

// executeMigrations()