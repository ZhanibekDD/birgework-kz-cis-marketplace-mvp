import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import GigDetailsPage from './pages/GigDetailsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardOverviewPage from './pages/dashboard/DashboardOverviewPage'
import DashboardServicesPage from './pages/dashboard/DashboardServicesPage'
import DashboardOrdersPage from './pages/dashboard/DashboardOrdersPage'
import DashboardMessagesPage from './pages/dashboard/DashboardMessagesPage'
import DashboardNotificationsPage from './pages/dashboard/DashboardNotificationsPage'
import DashboardSettingsPage from './pages/dashboard/DashboardSettingsPage'
import CreateServicePage from './pages/CreateServicePage'
import EditServicePage from './pages/EditServicePage'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/common/ProtectedRoute'
import OrderDetailsPage from './pages/orders/OrderDetailsPage'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/gig/:slug" element={<GigDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardOverviewPage /></ProtectedRoute>} />
        <Route path="/dashboard/services" element={<ProtectedRoute roles={['seller']}><DashboardServicesPage /></ProtectedRoute>} />
        <Route path="/dashboard/orders" element={<ProtectedRoute><DashboardOrdersPage /></ProtectedRoute>} />
        <Route path="/dashboard/orders/:orderId" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
        <Route path="/dashboard/messages" element={<ProtectedRoute><DashboardMessagesPage /></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute><DashboardNotificationsPage /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettingsPage /></ProtectedRoute>} />
        <Route path="/create-service" element={<ProtectedRoute roles={['seller']}><CreateServicePage /></ProtectedRoute>} />
        <Route path="/edit-service/:id" element={<ProtectedRoute roles={['seller']}><EditServicePage /></ProtectedRoute>} />
        <Route path="/checkout/:slug" element={<ProtectedRoute roles={['buyer']}><CheckoutPage /></ProtectedRoute>} />

        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/gig/:id" element={<Navigate to="/catalog" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  )
}
