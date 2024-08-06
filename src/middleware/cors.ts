import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:4321',
  'https://miguelgdro.com'
]

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}

export const corsMiddleware = cors(corsOptions)
