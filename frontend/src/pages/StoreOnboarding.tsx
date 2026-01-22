import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'

function StoreOnboardingInner() {
  const navigate = useNavigate()
  const { ready, authenticated, user } = usePrivy()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [hours, setHours] = useState('')

  useEffect(() => {
    if (ready && !authenticated) {
      navigate('/store/auth')
    }
  }, [authenticated, navigate, ready])

  useEffect(() => {
    const stored = localStorage.getItem('haul-store-profile')
    if (!stored) {
      return
    }
    try {
      const parsed = JSON.parse(stored) as {
        name?: string
        address?: string
        hours?: string
      }
      setName(parsed.name ?? '')
      setAddress(parsed.address ?? '')
      setHours(parsed.hours ?? '')
    } catch {
      return
    }
  }, [])

  const handleContinue = () => {
    localStorage.setItem(
      'haul-store-profile',
      JSON.stringify({ name, address, hours }),
    )
    navigate('/store/upload')
  }

  return (
    <AppShell>
      <TopBar title="Store Setup" backTo="/" />

      <div className="rounded-[24px] bg-white/80 p-4 text-xs text-slate-500 shadow-sm">
        {authenticated ? (
          <>
            Wallet ready · {user?.wallet?.address?.slice(0, 6)}...
            {user?.wallet?.address?.slice(-4)}
          </>
        ) : (
          'Connecting wallet...'
        )}
      </div>

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Business details</div>
        <div className="mt-4 grid gap-3 text-sm">
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Store name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Hours (e.g., Mon-Fri 9-6)"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Inventory snapshot</div>
        <div className="mt-3 text-xs text-slate-500">
          Help us tune your swipe deck.
        </div>
        <div className="mt-4 grid gap-3 text-sm">
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Typical items per week"
          />
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Top categories (tops, shoes, accessories)"
          />
        </div>
      </div>

      <button
        className={[
          'rounded-full px-6 py-4 text-center text-sm font-semibold transition',
          name && address
            ? 'haul-shadow bg-[var(--color-primary)] text-white'
            : 'cursor-not-allowed bg-slate-200 text-slate-400',
        ].join(' ')}
        type="button"
        onClick={handleContinue}
        disabled={!name || !address}
      >
        Continue to uploads
      </button>
    </AppShell>
  )
}

export function StoreOnboarding() {
  const hasPrivy = Boolean(import.meta.env.VITE_PRIVY_APP_ID)
  if (!hasPrivy) {
    return (
      <AppShell>
        <TopBar title="Store Setup" backTo="/" />
        <div className="rounded-[22px] bg-rose-50 p-4 text-xs text-rose-700">
          Missing `VITE_PRIVY_APP_ID`. Add it to `frontend/.env` to continue.
        </div>
      </AppShell>
    )
  }

  return <StoreOnboardingInner />
}
