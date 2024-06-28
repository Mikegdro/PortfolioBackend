import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres'

const DB_URL = process.env.DB_URL

if (typeof DB_URL === 'undefined' || typeof DB_URL === null) {
    throw new Error('No existe una url de conexión para la base de datos. Cree un .env y añada el parametor DB_URL')
}

const queryClient = postgres(DB_URL)

export default drizzle(queryClient)



