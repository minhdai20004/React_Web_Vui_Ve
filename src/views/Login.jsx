import { useState } from 'react'

const Login = ({ onLogin, onGoToRegister }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Sai tài khoản hoặc mật khẩu!')
      }

      onLogin(data.user.username)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="background-decor">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
      
      <div className="login-card glass animate-fade-in">
        <div className="login-header">
          <h2>Chào mừng trở lại</h2>
          <p>Đăng nhập để tiếp tục khám phá</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input 
              type="text" 
              placeholder="Nhập tên đăng nhập..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="error-msg">{error}</p>}
          
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Đang kiểm tra...' : 'Đăng nhập'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Chưa có tài khoản? <a href="#" onClick={onGoToRegister}>Đăng ký ngay</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
