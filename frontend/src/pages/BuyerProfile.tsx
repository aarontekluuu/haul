import { AppShell } from '../components/AppShell'
import { BottomNav } from '../components/BottomNav'
import { TopBar } from '../components/TopBar'
import { usePrivy } from '@privy-io/react-auth'

function BuyerProfileInner() {
  const { authenticated, user, logout } = usePrivy()

  return (
    <>
      <AppShell>
        <TopBar title="Buyer Profile" backTo="/buyer/swipe" />

        <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
          <div className="text-sm font-semibold">Pending pickups</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-[18px] bg-white px-4 py-3 shadow-sm">
              <div className="font-semibold text-[var(--color-secondary)]">
                Code H4UL92
              </div>
              <div className="text-xs text-slate-500">Goodwill Echo Park</div>
              <div className="mt-1 text-xs">Pickup Sat - Mon, 10am - 6pm</div>
            </div>
            <div className="rounded-[18px] bg-white px-4 py-3 shadow-sm">
              <div className="font-semibold text-[var(--color-secondary)]">
                Code Q7KP21
              </div>
              <div className="text-xs text-slate-500">Crossroads LA</div>
              <div className="mt-1 text-xs">Pickup Fri - Sun, 11am - 5pm</div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white/90 p-5 text-sm shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Wallet</div>
          {authenticated ? (
            <>
              <div className="mt-2 text-lg font-semibold">$24.00 USDC</div>
              <div className="mt-2 text-xs text-slate-500">
                {user?.wallet?.address
                  ? `Wallet ${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
                  : 'Wallet connected'}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white"
                  type="button"
                >
                  Add funds
                </button>
                <button
                  className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"
                  type="button"
                  onClick={() => logout()}
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <div className="mt-2 text-xs text-slate-500">
              Connect a wallet to view balance.
            </div>
          )}
        </div>
      </AppShell>
      <BottomNav />
    </>
  )
}

export function BuyerProfile() {
  const hasPrivy = Boolean(import.meta.env.VITE_PRIVY_APP_ID)
  if (!hasPrivy) {
    return (
      <>
        <AppShell>
          <TopBar title="Buyer Profile" backTo="/buyer/swipe" />
          <div className="rounded-[22px] bg-rose-50 p-4 text-xs text-rose-700">
            Missing `VITE_PRIVY_APP_ID`. Add it to `frontend/.env` to continue.
          </div>
        </AppShell>
        <BottomNav />
      </>
    )
  }

  return <BuyerProfileInner />
}
