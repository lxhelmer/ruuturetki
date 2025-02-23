import {
  BrowserRouter as Router,
  Routes, Route,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import 'leaflet/dist/leaflet.css' 
import { Button } from 'react-bootstrap'
import './App.css'
import Game from './Game.tsx'

//const start_pos = L.latLng(60.1718, 24.9395)


function GameButton() {
  const navigate = useNavigate()
  const location = useLocation()
  if (location.pathname === "/"){
    return (
      <Button 
        variant="dark"
        onClick={() => navigate('/game')}
        >
        play
      </Button>
    )
  }
  return null
}


function App() {
  const htmlElement = document.querySelector('html')
  if (htmlElement) {
    htmlElement.setAttribute('data-bs-theme', 'dark')
  }

  return (
    <>
      <Router>
        <GameButton/>
        <Routes>
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
