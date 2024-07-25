// Imports
import express from 'express'

// dotenv
import dotenv from 'dotenv'

// Routes
import projects from './routes/projectRouter'
import experiences from './routes/experienceRouter'
import tecnologies from './routes/tecnologyRouter'

import { corsMiddleware } from './middleware/cors'
import { executeMigrations } from './db/migrate'
import seedDB from './db/seed'

dotenv.config()

// Initalization message
console.log('Initializing server...')

// Migrations
executeMigrations().then(() => {
  // Seeding the DB
  if (process.env.NODE_ENV === 'development') {
    seedDB()
  }
})

// App initialization
const app = express()
app.use(express.json())
app.use(corsMiddleware)
app.disable('x-powered-by')

// Routes & Endpoints
app.use('/api/projects', projects)
app.use('/api/experiences', experiences)
app.use('/api/tecnologies', tecnologies)

const port = 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
