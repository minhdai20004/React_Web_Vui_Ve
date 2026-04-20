import { useState } from 'react'

const Tasks = () => {
  const [taskList, setTaskList] = useState([
    { id: 1, text: 'Học React cơ bản', completed: true },
    { id: 2, text: 'Tạo giao diện Đăng nhập', completed: true },
    { id: 3, text: 'Thêm tính năng To-do list', completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTaskList([...taskList, { id: Date.now(), text: newTask, completed: false }])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTaskList(taskList.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTaskList(taskList.filter(t => t.id !== id))
  }

  return (
    <div className="tasks-page glass">
      <div className="tasks-header">
        <h2>Danh sách công việc</h2>
        <p>Quản lý các mục tiêu trong ngày của bạn</p>
      </div>

      <form onSubmit={addTask} className="task-input-group">
        <input 
          type="text" 
          placeholder="Thêm công việc mới..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-task-btn">Thêm</button>
      </form>

      <ul className="task-list">
        {taskList.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content" onClick={() => toggleTask(task.id)}>
              <span className="checkbox">{task.completed ? '✅' : '⭕'}</span>
              <span className="task-text">{task.text}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
        {taskList.length === 0 && <li className="empty-state">Chưa có công việc nào. Hãy thêm một cái!</li>}
      </ul>
    </div>
  )
}

export default Tasks
