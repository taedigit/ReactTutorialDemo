import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './pages/MainContent'

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  )
}

export default App
