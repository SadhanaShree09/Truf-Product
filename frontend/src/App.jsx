import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './components/dashboard/DashboardPage.jsx'
import LoginPage from './components/login/LoginPage.jsx'
import LogoutPage from './components/login/LogoutPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
