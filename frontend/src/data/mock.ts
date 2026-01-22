export type Item = {
  id: string
  name: string
  price: number
  store: string
  distance: string
  condition: 'excellent' | 'good' | 'fair'
  category: string
  description: string
  image: string
  pickupWindow: string
  address: string
}

export const items: Item[] = [
  {
    id: 'item-1',
    name: "Vintage Levi's 501",
    price: 18,
    store: 'Goodwill Echo Park',
    distance: '1.2 mi',
    condition: 'good',
    category: 'Bottoms',
    description: 'Classic straight-leg denim with authentic wear and a soft medium wash.',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    pickupWindow: 'Sat - Mon, 10am - 6pm',
    address: '1280 Sunset Blvd, Los Angeles',
  },
  {
    id: 'item-2',
    name: 'Cropped Denim Jacket',
    price: 24,
    store: 'Crossroads LA',
    distance: '2.4 mi',
    condition: 'excellent',
    category: 'Outerwear',
    description: 'Crisp cropped fit with structured shoulders and a bright wash.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    pickupWindow: 'Fri - Sun, 11am - 5pm',
    address: '820 Melrose Ave, Los Angeles',
  },
  {
    id: 'item-3',
    name: 'Retro Windbreaker',
    price: 16,
    store: 'Buffalo Exchange',
    distance: '3.1 mi',
    condition: 'good',
    category: 'Outerwear',
    description: 'Color-blocked shell with lightweight lining and an easy oversized fit.',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    pickupWindow: 'Sat - Tue, 9am - 6pm',
    address: '450 Echo Park Ave, Los Angeles',
  },
  {
    id: 'item-4',
    name: 'Clean White Sneakers',
    price: 22,
    store: 'Out of the Closet',
    distance: '0.8 mi',
    condition: 'good',
    category: 'Shoes',
    description: 'Minimal low-top sneakers with light wear and fresh laces.',
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    pickupWindow: 'Sat - Mon, 10am - 7pm',
    address: '3326 Santa Monica Blvd, Los Angeles',
  },
  {
    id: 'item-5',
    name: 'Graphic Tee',
    price: 8,
    store: 'St. Vincent',
    distance: '4.6 mi',
    condition: 'fair',
    category: 'Tops',
    description: 'Soft cotton tee with a faded print that feels lived-in.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    pickupWindow: 'Fri - Sun, 12pm - 6pm',
    address: '5901 York Blvd, Los Angeles',
  },
]

export const bagItems = [items[0], items[2], items[4]]

export const pendingPickups = [
  {
    id: 'pickup-1',
    code: 'H4UL92',
    buyer: 'Sarah M.',
    items: ['Vintage Levi\'s 501', 'Graphic Tee'],
    window: 'Sat-Mon, 10am-6pm',
  },
  {
    id: 'pickup-2',
    code: 'Q7KP21',
    buyer: 'Jordan T.',
    items: ['Cropped Denim Jacket'],
    window: 'Fri-Sun, 11am-5pm',
  },
]
