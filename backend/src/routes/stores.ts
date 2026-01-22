import { Router } from 'express'
import { supabase } from '../lib/supabase'
import { requireAuth, AuthedRequest } from '../middleware/requireAuth'

export const storesRouter = Router()

storesRouter.post('/register', requireAuth, async (req, res) => {
  const { name, address, hours, lat, lng } = req.body || {}
  const auth = (req as AuthedRequest).auth

  if (!name || !address || lat === undefined || lng === undefined) {
    return res.status(400).json({
      error: 'Missing required fields: name, address, lat, lng',
    })
  }

  const hoursPayload =
    typeof hours === 'string' ? { display: hours } : hours || null

  const { data, error } = await supabase
    .from('stores')
    .upsert(
      {
        wallet_address: auth.walletAddress,
        name,
        address,
        hours: hoursPayload,
        lat,
        lng,
      },
      { onConflict: 'wallet_address' },
    )
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json({ store: data })
})
