import {
  BrowserRouter as Router,
  Routes, Route,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import 'leaflet/dist/leaflet.css' 
import { MapContainer, WMSTileLayer} from 'react-leaflet'
import { Button } from 'react-bootstrap'
import { getRandomLatLng } from './components/Game'
import { useState, useEffect } from 'react'
import './App.css'
import Game from './components/Game'
import { IGame } from './types'
import gameService from './services/games'
import { LUser } from './types'

import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import HelpModal from './components/modals/HelpModal'
import ScoreModal from './components/modals/ScoreModal'
import LogoutButton from './components/LogoutButton'


//const start_pos = L.latLng(60.1718, 24.9395)

function StartMenu() {
  const navigate = useNavigate()
  const [showRegModal, setRegModal] = useState(false)
  const [showLogModal, setLogModal] = useState(false)
  const [showHelpModal, setHelpModal] = useState(false)
  const [showScoreModal, setScoreModal] = useState(false)
  const bg_pos = getRandomLatLng()

  const handleCloseReg = () => setRegModal(false)
  const handleShowReg = () => setRegModal(true)

  const handleCloseLog = () => setLogModal(false)
  const handleShowLog = () => setLogModal(true)
  
  const handleCloseHelp = () => setHelpModal(false)
  const handleShowHelp = () => setHelpModal(true)

  const handleCloseScore = () => setScoreModal(false)
  const handleShowScore = () => {
    loadGames()
    setScoreModal(true)
  }

  const [games, setGames] = useState<IGame[]>([])
  const [user, setUser] = useState<LUser | null>(null)

  useEffect(() => {
    const gameUserJSON = window.localStorage.getItem('gameUser')
    if (gameUserJSON) {
      const user = JSON.parse(gameUserJSON)
      console.log(user)
      setUser(user)
      gameService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [showLogModal])


  const loadGames = async () => {
    try {
      const games = await gameService.getGames()
      console.log(games)
      setGames(games)
    } catch (error) {

    }
  }

	const wmsOptions: L.WMSOptions = {
		version: '1.1.1.1',
		layers: 'avoindata:Ortoilmakuva_2019_20cm',
    //layers: 'avoindata:Ortoilmakuva',
		format:'image/png',
		transparent: false,
	};
  const mapOptions: L.MapOptions = {
    center: bg_pos,
    zoom: 17,
    scrollWheelZoom: false,
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
    dragging: false,
  };
  return (
    <>
      <RegisterModal 
        show={showRegModal}
        handleCloseReg={handleCloseReg}
        />

      <LoginModal
        show={showLogModal}
        handleCloseLog={handleCloseLog}
        />

      <HelpModal
        show={showHelpModal}
        handleCloseHelp={handleCloseHelp}
        />

      <ScoreModal
        show={showScoreModal}
        handleCloseScore={handleCloseScore}
        games={games}
        />
      <MapContainer id="map" {...mapOptions}>
        <WMSTileLayer
          url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
          attribution={'&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>'}
          {...wmsOptions}
        />
      </MapContainer>
      <div id="menu-title">
          Ruuturetki
      </div>

      <div id="start-menu" className="d-grid gap-2">
        <Button
          variant="dark"
          size="lg"
          onClick={() => navigate('/game')}
          >
          play
        </Button>
        <Button
          variant="dark"
          size="lg"
          onClick={() => handleShowScore()}
          >
          scoreboard
        </Button>
                <Button
          variant="dark"
          size="lg"
          onClick={() => handleShowLog()}
          >
          login
        </Button>
        <Button
          variant="dark"
          size="lg"
          onClick={() => handleShowReg()}
          >
          register
        </Button>
        <Button
          variant="dark"
          size="lg"
          onClick={() => handleShowHelp()}
          >
          help
        </Button>
        <LogoutButton user={user} setUser={setUser}/>
      </div>

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
