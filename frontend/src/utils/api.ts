export const apiBase = import.meta.env.VITE_API_URL || ''

export const apiPost = async <T>(
  path: string,
  token: string,
  body: Record<string, unknown>,
): Promise<T> => {
  const res = await fetch(`${apiBase}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    // eslint-disable-next-line no-console
    console.warn('[API]', path, res.status, error)
    throw new Error(error.error || 'Request failed')
  }

  return res.json() as Promise<T>
}
