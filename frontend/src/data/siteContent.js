import {
  CircleDot,
  Disc3,
  Circle,
  MapPin,
  Navigation,
  Shield,
  Sparkles,
  Star,
  Ticket,
  Trophy,
  UserRound,
  Volleyball,
} from 'lucide-react'

export const colors = {
  background: '#0B0F14',
  secondaryBackground: '#131A22',
  card: '#1A222D',
  primaryGreen: '#39FF14',
  hoverGreen: '#5BFF4D',
  blueAccent: '#00C2FF',
  text: '#FFFFFF',
  secondaryText: '#B8C1CC',
  border: 'rgba(255,255,255,0.08)',
}

export const heroImage =
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80'

export const galleryImages = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511886929837-3549a8f8d3d6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1489945046313-0f0d9c9d0f6c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80',
]

export const sportFilters = [
  { name: 'Football', icon: CircleDot },
  { name: 'Cricket', icon: Trophy },
  { name: 'Badminton', icon: Volleyball },
  { name: 'Padel', icon: Disc3 },
  { name: 'Basketball', icon: Circle },
  { name: 'Pickleball', icon: Sparkles },
]

export const amenities = ['FIFA Turf', 'Night Lighting', 'Parking', 'Changing Room', 'Water Station']

export const slotSections = [
  {
    label: 'Morning',
    slots: [
      { time: '06:00 AM', price: 800, status: 'available' },
      { time: '07:00 AM', price: 800, status: 'available' },
      { time: '08:00 AM', price: 800, status: 'booked' },
      { time: '09:00 AM', price: 800, status: 'available' },
    ],
  },
  {
    label: 'Evening',
    slots: [
      { time: '05:00 PM', price: 1200, status: 'booked' },
      { time: '06:00 PM', price: 1200, status: 'available', featured: true },
      { time: '07:00 PM', price: 1200, status: 'available' },
      { time: '08:00 PM', price: 1200, status: 'available' },
    ],
  },
  {
    label: 'Late Night',
    slots: [
      { time: '09:00 PM', price: 1000, status: 'available' },
      { time: '10:00 PM', price: 1000, status: 'maintenance' },
      { time: '11:00 PM', price: 1000, status: 'available' },
      { time: '12:00 AM', price: 800, status: 'available' },
    ],
  },
]

export const galleryThumbs = [
  'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80',
]

export const pricingRows = [
  { label: '1 Hour', price: 1200 },
  { label: '2 Hours', price: 2000 },
  { label: '3 Hours', price: 2900 },
  { label: 'Weekend Peak', price: 1650 },
  { label: 'Night Slot', price: 1450 },
]

export const weatherMetrics = [
  { label: 'Humidity', value: '66%' },
  { label: 'Wind', value: '11 km/h' },
  { label: 'Feels like', value: '31°C' },
]

export const nearbyRestaurants = [
  { name: 'Fuel Bowl Cafe', distance: '220 m', cuisine: 'Protein bowls' },
  { name: 'The Touchline Diner', distance: '480 m', cuisine: 'South Indian' },
  { name: 'Metro Sports Kitchen', distance: '650 m', cuisine: 'Quick bites' },
]

export const parkingInfo = [
  { label: 'Two-wheeler bays', value: '48' },
  { label: 'Car bays', value: '32' },
  { label: 'Night surcharge', value: '₹50' },
]

export const reviews = [
  {
    name: 'Aarav S.',
    role: 'Weekend league captain',
    rating: 4.9,
    comment: 'The turf feels premium, the lights are consistent, and the booking flow is fast.',
    initials: 'AS',
  },
  {
    name: 'Nisha K.',
    role: 'Corporate team lead',
    rating: 4.8,
    comment: 'The evening slots and parking setup make after-work games genuinely easy.',
    initials: 'NK',
  },
]

export const bookingSummaryFields = [
  { label: 'Turf', value: 'GreenField Arena' },
  { label: 'Sport', value: 'Football', icon: CircleDot },
  { label: 'Date', value: '29 May 2025' },
  { label: 'Duration', value: '1 Hour' },
]

export const quickStats = [
  { label: 'Ratings', value: '4.8/5', icon: Star },
  { label: 'Bookable slots', value: '18 today', icon: Ticket },
  { label: 'Members nearby', value: '2.4k', icon: UserRound },
]

export const locationStats = [
  { label: 'HSR Layout', value: '560102', icon: MapPin },
  { label: 'Directions', value: '12 min drive', icon: Navigation },
  { label: 'Safety', value: 'Premium turf check', icon: Shield },
]

export const mapFacts = [
  { label: 'Address', value: 'HSR Layout, Bengaluru' },
  { label: 'Open now', value: '06:00 AM - 12:00 AM' },
  { label: 'Walk-in buffer', value: '10 min hold' },
]

export const offers = {
  title: 'Team Up & Save Big',
  copy: 'Book for 5 or more players and unlock up to 20% off on selected evening slots.',
  coupon: 'SAVE20',
}

export const footerLinks = [
  {
    title: 'Explore',
    items: ['Home', 'Bookings', 'Favourites', 'Support'],
  },
  {
    title: 'Social',
    items: ['Instagram', 'X / Twitter', 'LinkedIn', 'YouTube'],
  },
]

export const turfDescription =
  'Premium FIFA-grade turf with match-ready lighting, acoustic netting, secure parking, and a polished player experience built for after-work games and weekend tournaments.'
