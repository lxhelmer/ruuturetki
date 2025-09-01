import {
  BrowserRouter as Router,
  Routes, Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import 'leaflet/dist/leaflet.css' 
import { MapContainer, WMSTileLayer} from 'react-leaflet'
import { Button } from 'react-bootstrap'
import { getRandomLatLng } from './components/Game'
import { useState, useEffect } from 'react'
import './App.css'
import Game from './components/Game'
import gameService from './services/games'
import { LUser, IGame, GameSettings } from './types'

import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import HelpModal from './components/modals/HelpModal'
import ScoreModal from './components/modals/ScoreModal'
import PlayModal from './components/modals/PlayModal'
import LogoutButton from './components/LogoutButton'
import LoginButton from './components/LoginButton'
import LoginBanner from './components/LoginBanner'
import Practice from './components/Practice'
import L from 'leaflet'

function StartMenu({setGameSettings}:{setGameSettings: Function}) {
  const [showRegModal, setRegModal] = useState(false)
  const [showLogModal, setLogModal] = useState(false)
  const [showHelpModal, setHelpModal] = useState(false)
  const [showScoreModal, setScoreModal] = useState(false)
  const [showPlayModal, setPlayModal] = useState(false)

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

  const handleClosePlay = () => setPlayModal(false)
  const handleShowPlay = () => setPlayModal(true)

  const [games, setGames] = useState<IGame[]>([])
  const [user, setUser] = useState<LUser | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const gameUserJSON = window.localStorage.getItem('gameUser')
    if (gameUserJSON) {
      const user = JSON.parse(gameUserJSON)
      setUser(user)
      gameService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [showLogModal])

  useEffect(() => {
    loadGames()
    const fetch_id = setInterval(loadGames, 180000)
    return () => clearInterval(fetch_id)
  }, [])

  const loadGames = async () => {
    try {
      const games = await gameService.getGames()
      setGames(games)
    } catch (error) {
      console.log('could not fetch games')
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
        setGames={setGames}
        user={user}
        />
      <PlayModal
        show={showPlayModal}
        handleClosePlay={handleClosePlay}
        setGameSettings={setGameSettings}
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
          onClick={() => handleShowPlay()}
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
        <LogoutButton user={user} setUser={setUser}/>
        <LoginButton user={user} handleShowLog={handleShowLog}/>
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
          onClick={() => navigate("/practice")}
          >
          practice
        </Button>
        <Button
          variant="dark"
          size="lg"
          onClick={() => handleShowHelp()}
          >
          help
        </Button>

      </div>
      <div id="log-banner">
        <LoginBanner user={user}/>
      </div>
    </>
  )
}


function App() {
  const htmlElement = document.querySelector('html')
  if (htmlElement) {
    htmlElement.setAttribute('data-bs-theme', 'dark')
  }
  const [gameSettings, setGameSettings] = 
    useState<GameSettings>({
      map: 'avoindata:Ortoilmakuva_2019_20cm',
      year: 2019
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path="/game" element={<Game gameSettings={gameSettings}/>} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/" element={<StartMenu setGameSettings={setGameSettings}/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
