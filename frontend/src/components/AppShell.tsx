import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full px-4 pb-12 pt-6">
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-6">
        {children}
      </div>
    </div>
  )
}
