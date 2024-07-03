import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres'

import dotenv from 'dotenv'

dotenv.config()

import * as schema from '../db/schema'

if (!process.env.DB_URL) {
  throw new Error('DB credentials not present')
}

export const connection = postgres(process.env.DB_URL)

export const db = drizzle(connection, {schema})

export const createTransaction = db.transaction