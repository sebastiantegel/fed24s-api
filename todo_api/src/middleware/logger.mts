import { Request, Response, NextFunction } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const currentDate = new Date().toISOString()
  console.log(`[${currentDate}] ${req.method} ${req.url}`)

  next()
}