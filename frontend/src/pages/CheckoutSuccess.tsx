import { AppShell } from '../components/AppShell'
import { BottomNav } from '../components/BottomNav'
import { TopBar } from '../components/TopBar'

export function CheckoutSuccess() {
  return (
    <>
      <AppShell>
        <TopBar title="Pickup Ready" backTo="/buyer/bag" />

        <div className="rounded-[32px] bg-white/90 p-6 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success)] text-lg font-semibold text-white">
            OK
          </div>
          <h2 className="mt-4 text-xl font-semibold">Your haul is ready</h2>
          <p className="mt-2 text-sm text-slate-500">
            Show this code to the store when you pick up.
          </p>
          <div className="mt-5 rounded-[18px] border border-dashed border-slate-200 px-4 py-3 text-2xl font-semibold tracking-[0.3em] text-[var(--color-secondary)]">
            H4UL92
          </div>
        </div>

        <div className="rounded-[28px] bg-white/90 p-5 text-sm shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Pickup window</div>
          <div className="mt-2 text-base font-semibold">Sat - Mon, 10am - 6pm</div>
          <div className="mt-3 text-xs text-slate-500">Store</div>
          <div className="mt-1 text-sm font-semibold">
            Goodwill Echo Park · 1.2 mi
          </div>
          <div className="mt-1 text-xs text-slate-500">
            1280 Sunset Blvd, Los Angeles
          </div>
        </div>

        <button
          className="rounded-full border border-white/70 bg-white/70 px-6 py-4 text-sm font-semibold text-[var(--color-secondary)] shadow-sm"
          type="button"
        >
          Add to calendar
        </button>
      </AppShell>
      <BottomNav />
    </>
  )
}
