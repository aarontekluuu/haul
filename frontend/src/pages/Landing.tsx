import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'

export function Landing() {
  const [showRole, setShowRole] = useState(false)

  return (
    <AppShell maxWidthClass="max-w-[720px]">
      <div className="relative overflow-hidden rounded-[32px] bg-white/80 p-6 shadow-xl">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--color-accent)] opacity-30 blur-2xl" />
        <div className="absolute -left-8 bottom-6 h-32 w-32 rounded-full bg-[var(--color-secondary)] opacity-20 blur-2xl" />
        <div className="relative flex min-h-[360px] flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Haul
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-[var(--color-ink)]">
              Find your next Haul
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Swipe and match with steals from thrift stores near you.
            </p>
          </div>
        </div>
      </div>

      <button
        className="haul-shadow rounded-full bg-[var(--color-primary)] px-6 py-4 text-center text-sm font-semibold text-white transition hover:translate-y-[-1px]"
        type="button"
        onClick={() => setShowRole(true)}
      >
        Get Started
      </button>

      {showRole && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[520px] rounded-[28px] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Who are you?</div>
              <button
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                type="button"
                onClick={() => setShowRole(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              <Link
                className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm"
                to="/store/auth"
              >
                I'm a thrift store
              </Link>
              <Link
                className="rounded-[18px] bg-[var(--color-secondary)] px-4 py-4 text-sm font-semibold text-white shadow-sm"
                to="/buyer/auth"
              >
                I'm a customer
              </Link>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              You can switch roles later.
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}
