import type { NextFunction, Request, Response } from 'express'
import { env } from '../env'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  if (env.LOG_LEVEL !== 'debug') {
    return next()
  }

  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    // eslint-disable-next-line no-console
    console.log(
      `[API] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
    )
  })
  next()
}
