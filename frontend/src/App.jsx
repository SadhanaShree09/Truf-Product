import './App.css'
import DashboardPage from './components/DashboardPage.jsx'
import AuthPanel from './components/AuthPanel.jsx'
import { useState } from 'react'

function App() {
  const [authMode, setAuthMode] = useState('login')

  return (
    <main className="app-layout">
      <DashboardPage onAuthRequest={setAuthMode} />
      <AuthPanel mode={authMode} onModeChange={setAuthMode} />
    </main>
  )
}

export default App
