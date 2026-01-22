import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { items } from '../data/mock'

export function StoreReview() {
  return (
    <AppShell>
      <TopBar title="Review Items" backTo="/store/upload" />

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">AI processed items</div>
        <div className="mt-4 grid gap-4">
          {items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="rounded-[22px] border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <div
                  className="h-20 w-20 rounded-[16px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {item.category} · {item.condition}
                  </div>
                  <div className="mt-2 flex gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-1">
                      AI price
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-1">
                      Editable
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-xs">
                <input
                  className="w-full rounded-[12px] border border-slate-200 px-3 py-2"
                  defaultValue={`$${item.price}`}
                />
                <select className="w-full rounded-[12px] border border-slate-200 px-3 py-2">
                  {['Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Accessories'].map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ),
                  )}
                </select>
                <textarea
                  className="w-full rounded-[12px] border border-slate-200 px-3 py-2"
                  defaultValue={item.description}
                  rows={2}
                />
                <button
                  className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                  type="button"
                >
                  Approve item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        className="haul-shadow rounded-full bg-[var(--color-secondary)] px-6 py-4 text-center text-sm font-semibold text-white"
        to="/store/dashboard"
      >
        Approve all items
      </Link>
    </AppShell>
  )
}
