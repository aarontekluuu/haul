import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'

export function Terms() {
  return (
    <AppShell maxWidthClass="max-w-[720px]">
      <TopBar title="Terms" backTo="/" />
      <div className="rounded-[24px] border border-[var(--color-primary)] bg-white/90 p-6 text-sm text-slate-600">
        <p>
          Haul is a demo experience. Inventory, pricing, and pickup windows are
          provided by participating stores. Use at your own discretion.
        </p>
        <p className="mt-4">
          Payments are processed via embedded wallets. All sales are final for
          demo purposes unless a store cancels the pickup.
        </p>
      </div>
    </AppShell>
  )
}
