import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import postgres from 'postgres';

// Migrations

export const Migrate = () => {
    const migrateClient = postgres("postgres://admin:1234@127.0.0.1:5432/portfolio");
    
    migrate(drizzle(migrateClient), "");
}

// Client
const queryClient = postgres("postgres://admin:1234@127.0.0.1:5432/portfolio");

export const db = drizzle(queryClient);