import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres'

import dotenv from 'dotenv'

dotenv.config()

if (!process.env.DB_URL) {
    throw new Error('DB credentials not present')
}

const connection = postgres(process.env.DB_URL)

export const db = drizzle(connection)







