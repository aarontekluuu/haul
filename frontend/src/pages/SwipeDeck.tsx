import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { AppShell } from '../components/AppShell'
import { BottomNav } from '../components/BottomNav'
import { TopBar } from '../components/TopBar'
import { items } from '../data/mock'

export function SwipeDeck() {
  const [index, setIndex] = useState(0)
  const [bagCount, setBagCount] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [stamp, setStamp] = useState<'like' | 'pass' | null>(null)
  const [pulse, setPulse] = useState<'like' | 'pass' | null>(null)
  const pulseTimer = useRef<number | null>(null)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-160, 160], [-10, 10])
  const likeOpacity = useTransform(x, [0, 120], [0, 1])
  const nopeOpacity = useTransform(x, [-120, 0], [1, 0])
  const deck = useMemo(() => {
    const stored = localStorage.getItem('haul-preferences')
    if (!stored) {
      return items
    }
    try {
      const parsed = JSON.parse(stored) as {
        categories?: string[]
        priceRange?: [number, number]
      }
      const categories = parsed.categories || []
      const maxPrice = parsed.priceRange?.[1]
      return items.filter((item) => {
        const categoryMatch =
          categories.length === 0 ||
          categories.includes('Everything') ||
          categories.includes(item.category)
        const priceMatch = maxPrice ? item.price <= maxPrice : true
        return categoryMatch && priceMatch
      })
    } catch {
      return items
    }
  }, [])
  const current = deck[index]
  const next = deck[index + 1]
  const third = deck[index + 2]
  const progress = deck.length
    ? Math.min(((index + 1) / deck.length) * 100, 100)
    : 0

  const progressLabel = useMemo(() => {
    if (!current) {
      return 'Deck complete'
    }
    return `${index + 1} of ${deck.length}`
  }, [current, deck.length, index])

  const advance = () => {
    setIndex((value) => Math.min(value + 1, deck.length))
  }

  const swipeCard = async (direction: 'left' | 'right') => {
    setStamp(direction === 'right' ? 'like' : 'pass')
    await controls.start({
      x: direction === 'right' ? 520 : -520,
      opacity: 0,
      transition: { duration: 0.25 },
    })
    setStamp(null)
    if (direction === 'right') {
      setBagCount((count) => count + 1)
    }
    advance()
    controls.set({ x: 0, opacity: 1 })
    x.set(0)
    setShowDetails(false)
  }

  const triggerPulse = (direction: 'left' | 'right') => {
    setPulse(direction === 'right' ? 'like' : 'pass')
    if (pulseTimer.current) {
      window.clearTimeout(pulseTimer.current)
    }
    pulseTimer.current = window.setTimeout(() => {
      setPulse(null)
    }, 300)
  }

  return (
    <>
      <AppShell>
        <TopBar
          title="Swipe Deck"
          backTo="/"
          action={
            <Link
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-xs font-semibold text-[var(--color-secondary)] shadow-sm"
              to="/buyer/bag"
            >
              {bagCount}
              <span className="sr-only">Bag</span>
            </Link>
          }
        />

        <div className="rounded-[28px] bg-white/80 p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Discover</span>
            <span>{progressLabel}</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[var(--color-primary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="relative min-h-[440px]">
          {third && (
            <div
              className="absolute inset-5 rounded-[28px] bg-white/60 shadow-sm"
              style={{ transform: 'scale(0.92) translateY(12px)' }}
            >
              <div
                className="h-full w-full rounded-[28px] bg-cover bg-center"
                style={{ backgroundImage: `url(${third.image})` }}
              />
            </div>
          )}

          {next && (
            <div
              className="absolute inset-3 rounded-[30px] bg-white/70 shadow-sm"
              style={{ transform: 'scale(0.96) translateY(6px)' }}
            >
              <div
                className="h-full w-full rounded-[30px] bg-cover bg-center"
                style={{ backgroundImage: `url(${next.image})` }}
              />
            </div>
          )}

          {current ? (
            <motion.div
              className="absolute inset-0 rounded-[34px] bg-white shadow-lg"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 420, bounceDamping: 30 }}
              style={{ x, rotate }}
              animate={controls}
              onDragEnd={(_, info) => {
                if (info.offset.x > 120) {
                  swipeCard('right')
                  return
                }
                if (info.offset.x < -120) {
                  swipeCard('left')
                  return
                }
                controls.start({
                  x: 0,
                  transition: { type: 'spring', stiffness: 220, damping: 18 },
                })
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div
                className="relative h-full w-full rounded-[34px] bg-cover bg-center"
                style={{ backgroundImage: `url(${current.image})` }}
                onClick={() => setShowDetails(true)}
              >
                <AnimatePresence>
                  {stamp && (
                    <motion.div
                      className={[
                        'absolute left-1/2 top-24 -translate-x-1/2 rounded-full border px-5 py-2 text-sm font-semibold tracking-[0.2em]',
                        stamp === 'like'
                          ? 'border-[var(--color-success)] text-[var(--color-success)]'
                          : 'border-[var(--color-error)] text-[var(--color-error)]',
                      ].join(' ')}
                      initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                      animate={{ opacity: 1, scale: 1, rotate: 6 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      {stamp === 'like' ? 'LIKE' : 'PASS'}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--color-secondary)]"
                  style={{ opacity: likeOpacity }}
                >
                  LIKE
                </motion.div>
                <motion.div
                  className="absolute right-5 top-5 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--color-error)]"
                  style={{ opacity: nopeOpacity }}
                >
                  PASS
                </motion.div>
                <div className="absolute inset-0 rounded-[34px] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--color-ink)]">
                  ${current.price}
                </div>
                <div className="absolute bottom-5 left-5 right-5 space-y-2 text-white">
                  <div className="text-xl font-semibold">{current.name}</div>
                  <div className="text-xs text-white/80">
                    {current.store} · {current.distance}
                  </div>
                  <p className="text-xs leading-relaxed text-white/70">
                    {current.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-[34px] bg-white/70 p-8 text-center text-sm text-slate-500">
              No more items nearby. Adjust your preferences or check back later.
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            className="rounded-full border border-slate-200 bg-white/70 py-3 text-sm font-semibold text-slate-500"
            onClick={() => {
              triggerPulse('left')
              swipeCard('left')
            }}
            type="button"
          >
            <span className="relative">
              Skip
              {pulse === 'pass' && (
                <motion.span
                  className="absolute -left-3 -top-2 h-10 w-10 rounded-full border border-slate-300"
                  initial={{ opacity: 0.6, scale: 0.6 }}
                  animate={{ opacity: 0, scale: 1.4 }}
                />
              )}
            </span>
          </button>
          <button
            className="haul-shadow rounded-full bg-[var(--color-primary)] py-3 text-sm font-semibold text-white"
            onClick={() => {
              triggerPulse('right')
              swipeCard('right')
            }}
            type="button"
          >
            <span className="relative">
              Add to Bag
              {pulse === 'like' && (
                <motion.span
                  className="absolute -left-3 -top-2 h-10 w-10 rounded-full border border-white/70"
                  initial={{ opacity: 0.6, scale: 0.6 }}
                  animate={{ opacity: 0, scale: 1.4 }}
                />
              )}
            </span>
          </button>
          <Link
            className="rounded-full border border-slate-200 bg-white/70 py-3 text-center text-sm font-semibold text-slate-600"
            to="/buyer/bag"
          >
            Bag
          </Link>
        </div>

        <AnimatePresence>
          {current && showDetails && (
            <motion.div
              className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 px-4 pb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                className="w-full max-w-[420px] rounded-[28px] bg-white p-5 shadow-xl"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{current.name}</div>
                    <div className="text-xs text-slate-500">
                      {current.store} · {current.distance}
                    </div>
                  </div>
                  <button
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                    type="button"
                    onClick={() => setShowDetails(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={[
                        'rounded-full px-3 py-1 text-slate-700',
                        current.condition === 'excellent'
                          ? 'bg-emerald-100'
                          : current.condition === 'good'
                            ? 'bg-amber-100'
                            : 'bg-rose-100',
                      ].join(' ')}
                    >
                      {current.condition}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                      {current.category}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-secondary)]">
                    ${current.price}
                  </div>
                </div>
                <div className="mt-4 h-32 overflow-hidden rounded-[18px] bg-slate-100">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${current.image})` }}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-600">{current.description}</p>
                <div className="mt-4 rounded-[18px] bg-slate-50 px-4 py-3 text-xs text-slate-600">
                  <div className="font-semibold text-slate-700">
                    Pickup window
                  </div>
                  <div className="mt-1">{current.pickupWindow}</div>
                  <div className="mt-1">{current.address}</div>
                </div>
                <div className="mt-3 rounded-[18px] border border-dashed border-slate-200 px-4 py-3 text-xs text-slate-500">
                  Map preview placeholder
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-600"
                    type="button"
                    onClick={() => setShowDetails(false)}
                  >
                    Keep browsing
                  </button>
                  <button
                    className="flex-1 rounded-full bg-[var(--color-primary)] py-3 text-sm font-semibold text-white"
                    type="button"
                    onClick={() => swipeCard('right')}
                  >
                    Add to bag
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AppShell>
      <BottomNav />
    </>
  )
}
