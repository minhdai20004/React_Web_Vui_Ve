const Dashboard = ({ user }) => {
  const stats = [
    { label: 'Công việc hoàn thành', value: '12', color: '#10b981' },
    { label: 'Đang thực hiện', value: '5', color: '#f59e0b' },
    { label: 'Thông báo mới', value: '3', color: '#3b82f6' },
  ]

  return (
    <div className="dashboard-page">
      <div className="welcome-banner glass">
        <div className="welcome-text">
          <h2>Chào mừng quay trở lại, {user?.username}! 👋</h2>
          <p>Hôm nay là một ngày tuyệt vời để hoàn thành mục tiêu của bạn.</p>
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card glass animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value" style={{ color: stat.color }}>{stat.value}</h3>
            </div>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              📈
            </div>
          </div>
        ))}
      </div>
      
      <div className="recent-activity glass">
        <h3>Hoạt động gần đây</h3>
        <ul className="activity-list">
          <li className="activity-item">
            <span className="dot" style={{ backgroundColor: '#3b82f6' }}></span>
            <div className="activity-details">
              <p className="activity-title">Bạn đã đăng nhập vào hệ thống</p>
              <p className="activity-time">{user?.loginTime}</p>
            </div>
          </li>
          <li className="activity-item">
            <span className="dot" style={{ backgroundColor: '#10b981' }}></span>
            <div className="activity-details">
              <p className="activity-title">Dự án "Vui vẻ" đã được khởi tạo</p>
              <p className="activity-time">Vừa xong</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
