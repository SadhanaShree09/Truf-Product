import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import PublicDashboard from './components/dashboard/PublicDashboard.jsx'
import UserDashboard from './components/dashboard/UserDashboard.jsx'
import AdminDashboard from './components/dashboard/AdminDashboard.jsx'
import LoginPage from './components/login/LoginPage.jsx'
import LogoutPage from './components/login/LogoutPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
