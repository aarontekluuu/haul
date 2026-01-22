import type { NextFunction, Request, Response } from 'express'
import { privy } from '../lib/privy'

export type AuthContext = {
  userId: string
  walletAddress: string
  email?: string
}

export type AuthedRequest = Request & { auth: AuthContext }

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header('authorization')
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' })
  }

  try {
    const claims = await privy.verifyAuthToken(authHeader)
    const user = await privy.getUser(claims.userId)
    const walletAddress = user.wallet?.address || user.smartWallet?.address

    if (!walletAddress) {
      return res.status(400).json({ error: 'No wallet address on Privy user' })
    }

    const auth = {
      userId: user.id,
      walletAddress,
      email: user.email?.address,
    }

    ;(req as AuthedRequest).auth = auth
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid auth token' })
  }
}
