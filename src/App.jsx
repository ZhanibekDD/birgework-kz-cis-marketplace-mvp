import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import GigDetails from './pages/GigDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import SellerDashboard from './pages/SellerDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/gig/:id" element={<GigDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<SellerDashboard />} />
    </Routes>
  )
}
