import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { apiPost } from '../utils/api'

function BuyerOnboardingInner() {
  const navigate = useNavigate()
  const { ready, authenticated, user, getAccessToken } = usePrivy()
  const [categories, setCategories] = useState<string[]>([])
  const [vibes, setVibes] = useState<string[]>([])
  const [distance, setDistance] = useState(5)
  const [price, setPrice] = useState(25)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle',
  )

  const categoryOptions = useMemo(
    () => ['Tops', 'Bottoms', 'Shoes', 'Accessories', 'Outerwear', 'Everything'],
    [],
  )
  const vibeOptions = useMemo(
    () => ['Vintage', 'Streetwear', 'Minimal', 'Y2K', 'Grunge', 'Preppy'],
    [],
  )

  const toggleItem = (
    value: string,
    current: string[],
    setter: (next: string[]) => void,
  ) => {
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value))
      return
    }
    setter([...current, value])
  }

  const handleContinue = async () => {
    const payload = {
      categories: categories.length ? categories : categoryOptions,
      vibes: vibes.length ? vibes : vibeOptions,
      maxDistance: distance,
      priceRange: [5, price],
    }
    localStorage.setItem('haul-preferences', JSON.stringify(payload))
    const token = await getAccessToken()
    if (token) {
      try {
        setSaveState('saving')
        await apiPost('/api/users/register', token, { preferences: payload })
        setSaveState('saved')
      } catch {
        setSaveState('error')
        // Non-blocking for demo; local storage still drives UX.
      }
    }
    navigate('/buyer/swipe')
  }

  useEffect(() => {
    if (ready && !authenticated) {
      navigate('/buyer/auth')
    }
  }, [authenticated, navigate, ready])

  useEffect(() => {
    const stored = localStorage.getItem('haul-preferences')
    if (!stored) {
      return
    }
    try {
      const parsed = JSON.parse(stored) as {
        categories?: string[]
        vibes?: string[]
        maxDistance?: number
        priceRange?: [number, number]
      }
      setCategories(parsed.categories ?? [])
      setVibes(parsed.vibes ?? [])
      setDistance(parsed.maxDistance ?? 5)
      setPrice(parsed.priceRange?.[1] ?? 25)
    } catch {
      return
    }
  }, [])

  return (
    <AppShell>
      <TopBar title="Buyer Onboarding" backTo="/" />

      <div className="rounded-[24px] bg-white/80 p-4 text-xs text-slate-500 shadow-sm">
        {authenticated ? (
          <>
            Wallet ready · {user?.wallet?.address?.slice(0, 6)}...
            {user?.wallet?.address?.slice(-4)}
          </>
        ) : (
          'Connecting wallet...'
        )}
      </div>
      {saveState !== 'idle' && (
        <div
          className={[
            'rounded-[22px] px-4 py-3 text-xs shadow-sm',
            saveState === 'saved'
              ? 'bg-emerald-50 text-emerald-700'
              : saveState === 'error'
                ? 'bg-rose-50 text-rose-700'
                : 'bg-slate-100 text-slate-600',
          ].join(' ')}
        >
          {saveState === 'saving' && 'Saving preferences to Supabase...'}
          {saveState === 'saved' && 'Preferences saved.'}
          {saveState === 'error' &&
            'Could not save preferences yet. Local settings still apply.'}
        </div>
      )}

      <div className="rounded-[28px] bg-white/80 p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Step 1 of 4</span>
          <span className="text-[var(--color-secondary)]">Preferences</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
          <div className="h-full w-1/3 rounded-full bg-[var(--color-primary)]" />
        </div>
      </div>

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">What are you looking for?</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          {categoryOptions.map((item) => {
            const isSelected = categories.includes(item)
            return (
              <button
                key={item}
                className={[
                  'rounded-[16px] border px-3 py-3 font-semibold transition',
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'border-slate-200 text-slate-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
                ].join(' ')}
                type="button"
                onClick={() => toggleItem(item, categories, setCategories)}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Pick your vibe</div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {vibeOptions.map((item) => {
            const isSelected = vibes.includes(item)
            return (
              <button
                key={item}
                className={[
                  'rounded-full border px-4 py-2 font-semibold transition',
                  isSelected
                    ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'
                    : 'border-slate-200 text-slate-600 hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]',
                ].join(' ')}
                type="button"
                onClick={() => toggleItem(item, vibes, setVibes)}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4 rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div>
          <div className="text-sm font-semibold">Max distance</div>
          <div className="mt-2 text-xs text-slate-500">{distance} miles</div>
          <input
            className="mt-3 w-full accent-[var(--color-primary)]"
            value={distance}
            max={25}
            min={1}
            type="range"
            onChange={(event) => setDistance(Number(event.target.value))}
          />
        </div>
        <div>
          <div className="text-sm font-semibold">Price range</div>
          <div className="mt-2 text-xs text-slate-500">$5 - ${price}</div>
          <input
            className="mt-3 w-full accent-[var(--color-secondary)]"
            value={price}
            max={50}
            min={5}
            type="range"
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>
      </div>

      <button
        className="haul-shadow rounded-full bg-[var(--color-secondary)] px-6 py-4 text-center text-sm font-semibold text-white"
        type="button"
        onClick={handleContinue}
      >
        Build my deck
      </button>
    </AppShell>
  )
}

export function BuyerOnboarding() {
  const hasPrivy = Boolean(import.meta.env.VITE_PRIVY_APP_ID)
  if (!hasPrivy) {
    return (
      <AppShell>
        <TopBar title="Buyer Onboarding" backTo="/" />
        <div className="rounded-[22px] bg-rose-50 p-4 text-xs text-rose-700">
          Missing `VITE_PRIVY_APP_ID`. Add it to `frontend/.env` to continue.
        </div>
      </AppShell>
    )
  }

  return <BuyerOnboardingInner />
}
