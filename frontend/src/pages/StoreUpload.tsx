import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { items } from '../data/mock'

export function StoreUpload() {
  return (
    <AppShell>
      <TopBar title="Upload Items" backTo="/store/onboarding" />

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Add items to Haul</div>
        <div className="mt-3 text-xs text-slate-500">
          Upload up to 20 photos at once.
        </div>
        <label className="mt-4 flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[22px] border border-dashed border-slate-300 bg-white/70 text-center text-xs text-slate-500">
          <span className="text-sm font-semibold text-slate-600">
            Tap to take photos or upload
          </span>
          <span>JPG or PNG</span>
          <input className="hidden" type="file" />
        </label>
      </div>

      <div className="rounded-[28px] bg-white/90 p-5 shadow-sm">
        <div className="text-sm font-semibold">Selected photos</div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {items.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="h-24 rounded-[18px] bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </div>
        <div className="mt-5 rounded-[18px] bg-[var(--color-secondary)] px-4 py-3 text-xs font-semibold text-white">
          AI is working its magic...
        </div>
      </div>

      <Link
        className="haul-shadow rounded-full bg-[var(--color-primary)] px-6 py-4 text-center text-sm font-semibold text-white"
        to="/store/review"
      >
        Review processed items
      </Link>
    </AppShell>
  )
}
