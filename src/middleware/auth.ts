import { NextFunction, Request, Response } from 'express'

export const AuthMiddleware = (request: Request, response: Response, next: NextFunction) => {
  // Retrieve the token
  const token = request.headers.authorization

  // Send the token to the GoAuth service to check it
  let auth = false

  if (!token) {
    auth = false
  }

  // Check the response from the service
  if (!auth) {
    response.status(401).send('The token is invalid.')
  }

  next()
}
