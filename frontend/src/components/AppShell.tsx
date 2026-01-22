import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
  maxWidthClass?: string
}

export function AppShell({ children, maxWidthClass }: AppShellProps) {
  return (
    <div className="min-h-screen w-full px-4 pb-12 pt-6">
      <div
        className={[
          'mx-auto flex w-full flex-col gap-6',
          maxWidthClass || 'max-w-[420px]',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}
