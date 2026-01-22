import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { pendingPickups } from '../data/mock'

export function StoreDashboard() {
  return (
    <AppShell>
      <TopBar title="Store Dashboard" backTo="/store/review" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Live items', value: '24' },
          { label: 'This week', value: '$318' },
          { label: 'Conversion', value: '11%' },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-[20px] bg-white/90 px-3 py-4 text-center text-xs shadow-sm"
          >
            <div className="text-lg font-semibold text-[var(--color-secondary)]">
              {metric.value}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Pending pickups</div>
        <div className="mt-4 grid gap-3 text-sm">
          {pendingPickups.map((pickup) => (
            <div
              key={pickup.id}
              className="rounded-[18px] border border-slate-100 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{pickup.code}</span>
                <span className="text-[var(--color-secondary)]">
                  {pickup.buyer}
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {pickup.items.join(', ')}
              </div>
              <div className="mt-2 text-xs text-slate-500">{pickup.window}</div>
              <button
                className="mt-3 rounded-full bg-[var(--color-primary)] px-3 py-2 text-xs font-semibold text-white"
                type="button"
              >
                Confirm pickup
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-[var(--color-secondary)] p-5 text-white shadow-sm">
        <div className="text-sm font-semibold">Next steps</div>
        <div className="mt-2 text-xs text-white/70">
          Upload more items to keep your swipe deck fresh and drive weekly
          traffic.
        </div>
      </div>
    </AppShell>
  )
}
