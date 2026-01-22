import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { BottomNav } from '../components/BottomNav'
import { TopBar } from '../components/TopBar'
import { bagItems } from '../data/mock'

export function Bag() {
  const subtotal = bagItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <AppShell>
        <TopBar title="Your Haul" backTo="/buyer/swipe" />

        <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Items</span>
            <span>${subtotal}</span>
          </div>
          <div className="mt-4 grid gap-3">
            {bagItems.map((item) => (
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
                <div className="text-sm font-semibold">${item.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-white/90 p-5 text-sm shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span>Subtotal</span>
            <span>${subtotal}</span>
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
          className="haul-shadow rounded-full bg-[var(--color-secondary)] px-6 py-4 text-center text-sm font-semibold text-white"
          to="/buyer/checkout-success"
        >
          Checkout with Crypto
        </Link>
      </AppShell>
      <BottomNav />
    </>
  )
}
