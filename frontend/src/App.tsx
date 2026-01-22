import { Navigate, Route, Routes } from 'react-router-dom'
import { Bag } from './pages/Bag'
import { BuyerAuth } from './pages/BuyerAuth'
import { BuyerOnboarding } from './pages/BuyerOnboarding'
import { BuyerProfile } from './pages/BuyerProfile'
import { Contact } from './pages/Contact'
import { CheckoutSuccess } from './pages/CheckoutSuccess'
import { Landing } from './pages/Landing'
import { Privacy } from './pages/Privacy'
import { StoreAuth } from './pages/StoreAuth'
import { StoreDashboard } from './pages/StoreDashboard'
import { StoreOnboarding } from './pages/StoreOnboarding'
import { StoreReview } from './pages/StoreReview'
import { StoreUpload } from './pages/StoreUpload'
import { SwipeDeck } from './pages/SwipeDeck'
import { Terms } from './pages/Terms'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/buyer/auth" element={<BuyerAuth />} />
      <Route path="/buyer/onboarding" element={<BuyerOnboarding />} />
      <Route path="/buyer/swipe" element={<SwipeDeck />} />
      <Route path="/buyer/bag" element={<Bag />} />
      <Route path="/buyer/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/buyer/profile" element={<BuyerProfile />} />
      <Route path="/store/auth" element={<StoreAuth />} />
      <Route path="/store/onboarding" element={<StoreOnboarding />} />
      <Route path="/store/upload" element={<StoreUpload />} />
      <Route path="/store/review" element={<StoreReview />} />
      <Route path="/store/dashboard" element={<StoreDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
