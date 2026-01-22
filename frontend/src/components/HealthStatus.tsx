import { useEffect, useState } from 'react'

type HealthState = {
  status: 'checking' | 'ok' | 'error'
  message?: string
  timestamp?: string
}

export function HealthStatus() {
  const [state, setState] = useState<HealthState>({ status: 'checking' })
  const apiBase = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    let isActive = true
    const controller = new AbortController()
    const endpoint = `${apiBase}/api/health`

    fetch(endpoint, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!isActive) {
          return
        }
        setState({
          status: data.status === 'ok' ? 'ok' : 'error',
          message: data.message,
          timestamp: data.timestamp,
        })
      })
      .catch(() => {
        if (!isActive) {
          return
        }
        setState({ status: 'error' })
      })

    return () => {
      isActive = false
      controller.abort()
    }
  }, [apiBase])

  return (
    <div className="rounded-[22px] bg-white/80 p-4 text-xs shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-slate-700">System status</div>
        <span
          className={[
            'rounded-full px-3 py-1 text-[11px] font-semibold',
            state.status === 'ok'
              ? 'bg-emerald-100 text-emerald-700'
              : state.status === 'error'
                ? 'bg-rose-100 text-rose-700'
                : 'bg-slate-100 text-slate-500',
          ].join(' ')}
        >
          {state.status === 'checking' ? 'Checking' : state.status}
        </span>
      </div>
      <div className="mt-2 text-slate-500">
        {state.message || 'Waiting for API health check.'}
      </div>
      {state.timestamp && (
        <div className="mt-1 text-[11px] text-slate-400">
          {new Date(state.timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}
