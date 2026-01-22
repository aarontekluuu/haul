import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'

export function Privacy() {
  return (
    <AppShell maxWidthClass="max-w-[720px]">
      <TopBar title="Privacy" backTo="/" />
      <div className="rounded-[24px] border border-[var(--color-primary)] bg-white/90 p-6 text-sm text-slate-600">
        <p>
          We only collect the minimum data needed to run Haul. Wallet addresses,
          login identifiers, and preferences are stored to deliver your matches.
        </p>
        <p className="mt-4">
          We never sell personal data. Contact us if you want data removed.
        </p>
      </div>
    </AppShell>
  )
}
