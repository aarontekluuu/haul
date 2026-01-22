import { Navigate, Route, Routes } from 'react-router-dom'
import { Bag } from './pages/Bag'
import { BuyerOnboarding } from './pages/BuyerOnboarding'
import { BuyerProfile } from './pages/BuyerProfile'
import { CheckoutSuccess } from './pages/CheckoutSuccess'
import { Landing } from './pages/Landing'
import { StoreDashboard } from './pages/StoreDashboard'
import { StoreOnboarding } from './pages/StoreOnboarding'
import { StoreReview } from './pages/StoreReview'
import { StoreUpload } from './pages/StoreUpload'
import { SwipeDeck } from './pages/SwipeDeck'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/buyer/onboarding" element={<BuyerOnboarding />} />
      <Route path="/buyer/swipe" element={<SwipeDeck />} />
      <Route path="/buyer/bag" element={<Bag />} />
      <Route path="/buyer/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/buyer/profile" element={<BuyerProfile />} />
      <Route path="/store/onboarding" element={<StoreOnboarding />} />
      <Route path="/store/upload" element={<StoreUpload />} />
      <Route path="/store/review" element={<StoreReview />} />
      <Route path="/store/dashboard" element={<StoreDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
