import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'

export function Landing() {
  const [showRole, setShowRole] = useState(false)
  const [fan, setFan] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 400, 1)
      setFan(progress)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cards = useMemo(
    () => [
      {
        title: 'Mystery Haul',
        detail: '3 items · $24',
        tag: 'Bag Drop',
      },
      {
        title: 'Single Item',
        detail: 'Vintage Leather Jacket · $32',
        tag: 'Grail',
      },
      {
        title: 'Single Item',
        detail: 'Patchwork Denim · $18',
        tag: 'Grail',
      },
    ],
    [],
  )

  return (
    <AppShell maxWidthClass="max-w-[860px]">
      <div className="relative overflow-hidden rounded-[32px] bg-white/80 p-6 shadow-xl">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--color-accent)] opacity-30 blur-2xl" />
        <div className="absolute -left-8 bottom-6 h-32 w-32 rounded-full bg-[var(--color-secondary)] opacity-20 blur-2xl" />
        <div className="relative grid min-h-[360px] gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-secondary)]">
              Haul
            </div>
            <div className="rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur">
              {!showRole ? (
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--color-ink)]">
                    Find your next Haul
                  </h1>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Swipe and match with steals from thrift stores near you.
                  </p>
                  <button
                    className="w-full rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
                    type="button"
                    onClick={() => setShowRole(true)}
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                    Who are you?
                  </div>
                  <div className="grid gap-3">
                    <Link
                      className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-800 shadow-sm"
                      to="/store/auth"
                    >
                      I'm a Store
                    </Link>
                    <Link
                      className="rounded-[18px] bg-[var(--color-secondary)] px-4 py-4 text-sm font-semibold text-white shadow-sm"
                      to="/buyer/auth"
                    >
                      I'm a Hunter
                    </Link>
                  </div>
                  <button
                    className="text-xs font-semibold text-slate-500"
                    type="button"
                    onClick={() => setShowRole(false)}
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="haul-card-stack md:sticky md:top-24">
              {cards.map((card, index) => {
                const fanOffset = fan * 26 * (index - 1)
                const fanRotate = fan * 6 * (index - 1)
                const fanTranslateY = fan * 20 * index
                return (
                  <div
                    key={card.detail}
                    className="haul-card"
                    style={{
                      ['--fan-x' as string]: `${fanOffset}px`,
                      ['--fan-y' as string]: `${fanTranslateY}px`,
                      ['--fan-rot' as string]: `${fanRotate}deg`,
                    }}
                  >
                    <div
                      className={[
                        'haul-card-motion p-4',
                        index === 0
                          ? 'haul-card-slide-1'
                          : index === 1
                            ? 'haul-card-slide-2'
                            : 'haul-card-slide-3',
                      ].join(' ')}
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{card.tag}</span>
                        <span>Swipe</span>
                      </div>
                      <div className="mt-6 text-lg font-semibold text-[var(--color-ink)]">
                        {card.title}
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        {card.detail}
                      </div>
                      <div className="mt-6 h-24 rounded-[16px] bg-gradient-to-br from-[#f5f5f5] to-[#ffffff]" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-[28px] border border-[var(--color-primary)]/20 bg-white/80 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
          Match · Pay · Pickup
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-[20px] border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-[var(--color-ink)]">
              Match
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Swipe through curated drops and lock in the pieces you love.
            </p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-[var(--color-ink)]">
              Pay
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Checkout in seconds with a gasless wallet that feels like Web2.
            </p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-[var(--color-ink)]">
              Pickup
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Grab your haul locally and keep thrift stores stocked and moving.
            </p>
          </div>
        </div>
      </section>

      <footer className="rounded-[24px] border border-[var(--color-primary)] bg-white/90 px-6 py-5 text-xs text-slate-600">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="font-semibold text-[var(--color-ink)]">Haul</div>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-[var(--color-accent)]" to="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-[var(--color-accent)]" to="/terms">
              Terms
            </Link>
            <Link className="hover:text-[var(--color-accent)]" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </AppShell>
  )
}
