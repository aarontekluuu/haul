import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'

export function StoreOnboarding() {
  const navigate = useNavigate()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) {
      navigate('/store/auth')
    }
  }, [authenticated, navigate, ready])

  return (
    <AppShell>
      <TopBar title="Store Setup" backTo="/" />

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Business details</div>
        <div className="mt-4 grid gap-3 text-sm">
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Store name"
          />
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Address"
          />
          <input
            className="w-full rounded-[16px] border border-slate-200 px-4 py-3"
            placeholder="Hours (e.g., Mon-Fri 9-6)"
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

      <Link
        className="haul-shadow rounded-full bg-[var(--color-primary)] px-6 py-4 text-center text-sm font-semibold text-white"
        to="/store/upload"
      >
        Continue to uploads
      </Link>
    </AppShell>
  )
}
