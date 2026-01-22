const STORAGE_KEY = 'haul-bag'

export const readBagIds = (): string[] => {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return []
    }
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const writeBagIds = (ids: string[]) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export const addToBag = (id: string) => {
  const current = readBagIds()
  if (!current.includes(id)) {
    writeBagIds([...current, id])
  }
}

export const removeFromBag = (id: string) => {
  const current = readBagIds()
  writeBagIds(current.filter((itemId) => itemId !== id))
}
