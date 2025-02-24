import {
  BrowserRouter as Router,
  Routes, Route,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import 'leaflet/dist/leaflet.css' 
import { Button } from 'react-bootstrap'
import './App.css'
import Game from './Game.tsx'

//const start_pos = L.latLng(60.1718, 24.9395)


function StartMenu() {
  const navigate = useNavigate()
  return (
    <>
      <Button 
        variant="dark"
        onClick={() => navigate('/game')}
        >
        play
      </Button>
    </>
  )
}


function App() {
  const htmlElement = document.querySelector('html')
  if (htmlElement) {
    htmlElement.setAttribute('data-bs-theme', 'dark')
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/" element={<StartMenu />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
