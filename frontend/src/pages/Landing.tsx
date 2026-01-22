import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { HealthStatus } from '../components/HealthStatus'

export function Landing() {
  return (
    <AppShell>
      <div className="relative overflow-hidden rounded-[32px] bg-white/80 p-6 shadow-xl">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--color-accent)] opacity-30 blur-2xl" />
        <div className="absolute -left-8 bottom-6 h-32 w-32 rounded-full bg-[var(--color-secondary)] opacity-20 blur-2xl" />
        <div className="relative flex min-h-[360px] flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Haul
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-[var(--color-ink)]">
              Your local thrift, swiped right.
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Sustainable fashion. Zero effort. All the finds. Upload once, let AI
              do the rest, and let buyers swipe through fresh inventory nearby.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-[13px] text-slate-600">
            <div className="rounded-[20px] bg-white px-3 py-4 shadow-sm">
              AI listing in under 2 minutes.
            </div>
            <div className="rounded-[20px] bg-white px-3 py-4 shadow-sm">
              Swipe deck built for Gen-Z.
            </div>
            <div className="rounded-[20px] bg-white px-3 py-4 shadow-sm">
              Crypto checkout with pickup code.
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <Link
          className="haul-shadow rounded-full bg-[var(--color-primary)] px-6 py-4 text-center text-sm font-semibold text-white transition hover:translate-y-[-1px]"
          to="/buyer/onboarding"
        >
          Start Swiping
        </Link>
        <Link
          className="rounded-full border border-white/70 bg-white/70 px-6 py-4 text-center text-sm font-semibold text-[var(--color-secondary)] shadow-sm transition hover:translate-y-[-1px]"
          to="/store/onboarding"
        >
          I'm a Thrift Store
        </Link>
      </div>

      <HealthStatus />

      <div className="rounded-[26px] bg-[var(--color-secondary)] p-5 text-white">
        <div className="text-sm font-semibold">
          Join 500+ USC students saving the planet one haul at a time.
        </div>
        <div className="mt-2 text-xs text-white/70">
          Local pickups, verified thrift stores, and fast onboarding.
        </div>
      </div>
    </AppShell>
  )
}
