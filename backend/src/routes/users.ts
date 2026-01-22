import { Router } from 'express'
import { supabase } from '../lib/supabase'
import { requireAuth, AuthedRequest } from '../middleware/requireAuth'

export const usersRouter = Router()

usersRouter.post('/register', requireAuth, async (req, res) => {
  const { preferences, email } = req.body || {}
  const auth = (req as AuthedRequest).auth

  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        wallet_address: auth.walletAddress,
        email: email || auth.email || null,
        preferences: preferences || null,
      },
      { onConflict: 'wallet_address' },
    )
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json({ user: data })
})
