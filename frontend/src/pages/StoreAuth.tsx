import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'

function StoreAuthInner() {
  const navigate = useNavigate()
  const { ready, authenticated, login, user } = usePrivy()

  useEffect(() => {
    if (ready && authenticated) {
      localStorage.setItem('haul-role', 'store')
      navigate('/store/onboarding')
    }
  }, [authenticated, navigate, ready])

  return (
    <AppShell>
      <TopBar title="Store Login" backTo="/" />

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Store account access</div>
        <div className="mt-2 text-xs text-slate-500">
          Use a social login to create an embedded wallet for payouts.
        </div>
        <button
          className="mt-5 w-full rounded-full bg-[var(--color-secondary)] px-4 py-3 text-sm font-semibold text-white"
          type="button"
          onClick={() => login()}
        >
          Continue with Privy
        </button>
      </div>

      {user?.wallet?.address && (
        <div className="rounded-[22px] bg-white/80 p-4 text-xs text-slate-500 shadow-sm">
          Wallet: {user.wallet.address.slice(0, 6)}...
          {user.wallet.address.slice(-4)}
        </div>
      )}
    </AppShell>
  )
}

export function StoreAuth() {
  const hasPrivy = Boolean(import.meta.env.VITE_PRIVY_APP_ID)
  if (!hasPrivy) {
    return (
      <AppShell>
        <TopBar title="Store Login" backTo="/" />
        <div className="rounded-[22px] bg-rose-50 p-4 text-xs text-rose-700">
          Missing `VITE_PRIVY_APP_ID`. Add it to `frontend/.env` to enable login.
        </div>
      </AppShell>
    )
  }

  return <StoreAuthInner />
}
