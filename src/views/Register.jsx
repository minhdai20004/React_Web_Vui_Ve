import { useState } from 'react'

const Register = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { fullname, username, password, confirmPassword } = formData

    if (!fullname || !username || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra!')
      }

      alert('Đăng ký thành công! Hãy đăng nhập.')
      onRegisterSuccess()
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
          <h2>Tạo tài khoản mới</h2>
          <p>Tham gia cộng đồng SuperApp ngay hôm nay</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Họ và tên</label>
            <input 
              name="fullname"
              type="text" 
              placeholder="Nguyễn Văn A" 
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input 
              name="username"
              type="text" 
              placeholder="admin123" 
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input 
              name="confirmPassword"
              type="password" 
              placeholder="••••••••" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          {error && <p className="error-msg">{error}</p>}
          
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Đã có tài khoản? <a href="#" onClick={onBackToLogin}>Đăng nhập</a></p>
        </div>
      </div>
    </div>
  )
}

export default Register
