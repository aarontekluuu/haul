import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { BottomNav } from '../components/BottomNav'
import { TopBar } from '../components/TopBar'
import { bagItems } from '../data/mock'

export function Bag() {
  const [items, setItems] = useState(bagItems)
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const breakdown = useMemo(() => {
    return items.reduce<Record<string, { total: number; items: typeof items }>>(
      (acc, item) => {
        const entry = acc[item.store] || { total: 0, items: [] }
        entry.items = [...entry.items, item]
        entry.total += item.price
        acc[item.store] = entry
        return acc
      },
      {},
    )
  }, [items])

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <AppShell>
        <TopBar title="Your Haul" backTo="/buyer/swipe" />

        <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Items</span>
            <span>${subtotal}</span>
          </div>
          {items.length ? (
            <div className="mt-4 grid gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-[20px] bg-white px-3 py-3 shadow-sm"
                >
                  <div
                    className="h-16 w-16 rounded-[16px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.store}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-xs">
                    <div className="text-sm font-semibold">${item.price}</div>
                    <button
                      className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500"
                      type="button"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-[18px] bg-white px-4 py-6 text-center text-sm text-slate-500 shadow-sm">
              Your bag is empty. Keep swiping to add items.
            </div>
          )}
        </div>

        <div className="rounded-[28px] bg-white/90 p-5 text-sm shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <div className="font-semibold text-slate-600">By store</div>
            <div className="mt-2 grid gap-3">
              {Object.entries(breakdown).map(([store, data]) => (
                <div key={store} className="rounded-[16px] bg-slate-50 px-3 py-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{store}</span>
                    <span>${data.total}</span>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                    {data.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-slate-500">
            <span>Platform fee</span>
            <span>$0</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
        </div>

        <Link
          className={[
            'rounded-full px-6 py-4 text-center text-sm font-semibold transition',
            items.length
              ? 'haul-shadow bg-[var(--color-secondary)] text-white'
              : 'cursor-not-allowed bg-slate-200 text-slate-400',
          ].join(' ')}
          to={items.length ? '/buyer/checkout-success' : '#'}
          onClick={(event) => {
            if (!items.length) {
              event.preventDefault()
            }
          }}
        >
          Checkout with Crypto
        </Link>
      </AppShell>
      <BottomNav />
    </>
  )
}
