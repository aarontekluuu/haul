import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'

export function Contact() {
  return (
    <AppShell maxWidthClass="max-w-[720px]">
      <TopBar title="Contact" backTo="/" />
      <div className="rounded-[24px] border border-[var(--color-primary)] bg-white/90 p-6 text-sm text-slate-600">
        <p>
          Email: <span className="font-semibold text-[var(--color-ink)]">team@haul.app</span>
        </p>
        <p className="mt-4">
          For demo feedback, include screenshots and the store or item name.
        </p>
      </div>
    </AppShell>
  )
}
