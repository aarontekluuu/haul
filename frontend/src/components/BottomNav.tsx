import { NavLink } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
}

const navItems: NavItem[] = [
  { to: '/buyer/swipe', label: 'Swipe' },
  { to: '/buyer/bag', label: 'Bag' },
  { to: '/buyer/profile', label: 'Profile' },
]

export function BottomNav() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-20 flex justify-center">
      <div className="haul-glass haul-border flex gap-3 rounded-full px-5 py-3 text-sm font-semibold shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              [
                'rounded-full px-4 py-2 transition',
                isActive
                  ? 'bg-[var(--color-secondary)] text-white'
                  : 'text-[color:var(--color-ink)]',
              ].join(' ')
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
