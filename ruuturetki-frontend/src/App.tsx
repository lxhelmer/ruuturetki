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
import { useState } from 'react'
import './App.css'
import Game from './components/Game'
import { GameSettings } from './types'

import PlayModal from './components/modals/PlayModal'
import Practice from './components/Practice'
import L from 'leaflet'

function StartMenu({
  setGameSettings,
  gameSettings
}: {
  setGameSettings: Function
  gameSettings: GameSettings
}) {
  const [showRegModal, setRegModal] = useState(false)
  const [showLogModal, setLogModal] = useState(false)
  const [showHelpModal, setHelpModal] = useState(false)
  const [showScoreModal, setScoreModal] = useState(false)
  const [showPlayModal, setPlayModal] = useState(false)
  const bg_pos = getRandomLatLng()



  const handleClosePlay = () => setPlayModal(false)
  const handleShowPlay = () => setPlayModal(true)


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

  useEffect(() => {
    // Reset default game settings when play modal is opened.
    if (showPlayModal) {
      console.log('Play modal opened. Resetting game settings: ', gameSettings)
      setGameSettings({
        ...gameSettings,
        dragging: true
      })
    }
    
  }, [showPlayModal])

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
      <PlayModal
        show={showPlayModal}
        handleClosePlay={handleClosePlay}
        setGameSettings={setGameSettings}
        gameSettings={gameSettings}
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
          onClick={() => navigate("/practice")}
          >
          practice
        </Button>

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
      year: 2019,
      dragging: true
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path="/game" element={<Game gameSettings={gameSettings}/>} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/" element={<StartMenu setGameSettings={setGameSettings} gameSettings={gameSettings}/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
