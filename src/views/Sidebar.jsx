const Sidebar = ({ activeTab, setActiveTab, onLogout, user }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊' },
    { id: 'tasks', label: 'Công việc', icon: '✅' },
    { id: 'profile', label: 'Cá nhân', icon: '👤' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
  ]

  return (
    <nav className="navbar glass">
      <div className="navbar-left">
        <div className="navbar-brand">
          <div className="logo-icon">🚀</div>
          <h2>Web_vui_ve</h2>
        </div>
      </div>
      
      <div className="navbar-center">
        <div className="navbar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item-h ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="user-info-h">
          <div className="avatar-h">{user?.username.charAt(0).toUpperCase()}</div>
          <p className="username-h">{user?.username}</p>
        </div>
        <button className="logout-btn-h" onClick={onLogout} title="Đăng xuất">
          <span className="nav-icon">🚪</span>
        </button>
      </div>
    </nav>
  )
}

export default Sidebar
