import { AppShell } from '../components/AppShell'
import { BottomNav } from '../components/BottomNav'
import { TopBar } from '../components/TopBar'

export function BuyerProfile() {
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
          <div className="mt-2 text-lg font-semibold">$24.00 USDC</div>
          <button
            className="mt-4 rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white"
            type="button"
          >
            Add funds
          </button>
        </div>
      </AppShell>
      <BottomNav />
    </>
  )
}
