const Profile = ({ user, setUser }) => {
  return (
    <div className="profile-page animate-fade-in">
      <div className="profile-card glass">
        <div className="profile-bg"></div>
        <div className="profile-avatar-container">
          <div className="profile-avatar">{user?.username.charAt(0).toUpperCase()}</div>
        </div>
        <div className="profile-body">
          <h3>{user?.username}</h3>
          <p className="profile-email">{user?.username.toLowerCase()}@example.com</p>
          
          <div className="profile-stats">
            <div className="p-stat">
              <span>Cấp độ</span>
              <strong>Thành viên Bạc</strong>
            </div>
            <div className="p-stat">
              <span>Tham gia</span>
              <strong>Tháng 4, 2024</strong>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="primary-btn">Chỉnh sửa hồ sơ</button>
            <button className="secondary-btn">Thay đổi mật khẩu</button>
          </div>
        </div>
      </div>
      
      <div className="settings-preview glass">
        <h3>Cài đặt nhanh</h3>
        <div className="setting-item">
          <label>Chế độ tối</label>
          <div className="toggle-switch active"></div>
        </div>
        <div className="setting-item">
          <label>Thông báo email</label>
          <div className="toggle-switch"></div>
        </div>
      </div>
    </div>
  )
}

export default Profile
