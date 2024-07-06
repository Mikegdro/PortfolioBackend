import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres'

import { migrate } from 'drizzle-orm/postgres-js/migrator'

import dotenv from 'dotenv'

import * as schema from '../db/schema'

dotenv.config()

if (!process.env.DB_URL) {
  throw new Error('DB credentials not present')
}

console.log(`Connecting to ${process.env.DB_URL}`)

// DB Export
export const connection = postgres(process.env.DB_URL)
export const db = drizzle(connection, { schema })

// Transaction export
export const createTransaction = db.transaction
