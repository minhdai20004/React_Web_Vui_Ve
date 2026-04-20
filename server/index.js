const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (Compass Local)
mongoose.connect('mongodb://localhost:27017/web_vui_ve')
  .then(() => console.log('✅ Đã kết nối với MongoDB Compass'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Routes
// 1. Đăng ký
app.post('/api/register', async (req, res) => {
  const { fullname, username, password } = req.body;

  try {
    // Kiểm tra xem user đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' });
    }

    const newUser = new User({ fullname, username, password });
    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!', error: err.message });
  }
});

// 2. Đăng nhập
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
    }

    res.status(200).json({ 
      message: 'Đăng nhập thành công!', 
      user: { username: user.username, fullname: user.fullname }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
