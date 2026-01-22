import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type TopBarProps = {
  title: string
  backTo?: string
  action?: ReactNode
}

export function TopBar({ title, backTo, action }: TopBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {backTo ? (
        <Link
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-sm font-semibold shadow-sm transition hover:bg-white"
          to={backTo}
        >
          Back
        </Link>
      ) : (
        <div className="h-10 w-10" />
      )}
      <div className="text-center text-lg font-semibold">{title}</div>
      <div className="h-10 w-10">{action}</div>
    </div>
  )
}
