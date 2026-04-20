import { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Register from './Register'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Tasks from './Tasks'
import Profile from './Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [authView, setAuthView] = useState('login')

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (username) => {
    const userData = { username, loginTime: new Date().toLocaleString() }
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('user')
    setAuthView('login')
  }

  if (!isLoggedIn) {
    return authView === 'login' ? (
      <Login onLogin={handleLogin} onGoToRegister={() => setAuthView('register')} />
    ) : (
      <Register onBackToLogin={() => setAuthView('login')} onRegisterSuccess={() => setAuthView('login')} />
    )
  }

  return (
    <div className="app-container-h">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user} />
      <main className="main-content-h">
        <div className="page-container animate-fade-in">
          <header className="page-header">
             <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          </header>
          {activeTab === 'dashboard' && <Dashboard user={user} />}
          {activeTab === 'tasks' && <Tasks />}
          {activeTab === 'profile' && <Profile user={user} setUser={setUser} />}
        </div>
      </main>
    </div>
  )
}

export default App
