import {
  BrowserRouter as Router,
  Routes, Route,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import 'leaflet/dist/leaflet.css' 
import { MapContainer, WMSTileLayer} from 'react-leaflet'
import { Button } from 'react-bootstrap'
import { getRandomLatLng } from './Game'
import { useState } from 'react'
import './App.css'
import Game from './Game.tsx'

import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'

//const start_pos = L.latLng(60.1718, 24.9395)

function StartMenu() {
  const navigate = useNavigate()
  const [showRegModal, setRegModal] = useState(false)
  const [showLogModal, setLogModal] = useState(false)
  const bg_pos = getRandomLatLng()



  const handleCloseReg = () => setRegModal(false)
  const handleShowReg = () => setRegModal(true)

  const handleCloseLog = () => setLogModal(false)
  const handleShowLog = () => setLogModal(true)

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

      <MapContainer id="map" {...mapOptions}>
        <WMSTileLayer
          url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
          {...wmsOptions}
        />
      </MapContainer>
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
