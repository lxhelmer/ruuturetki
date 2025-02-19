import { useState, } from 'react'
import { Button } from 'react-bootstrap'
import L from 'leaflet'
import './App.css'
import MapComponent from './MapComponent.tsx'

//const start_pos = L.latLng(60.1718, 24.9395)

function getRandomLatLng () {
  const southBoundLat: number = 60.13
  const northBoundLat: number = 60.295
  const eastBoundLon: number = 25.20
  const westBoundLon: number = 24.82

  const randomLat: number = Math.random() * (northBoundLat - southBoundLat) + southBoundLat
  const randomLon: number = Math.random() * (eastBoundLon - westBoundLon) + westBoundLon
  
  return (
    L.latLng(randomLat, randomLon)
  )
}


function App() {
  const [map, setMap] = useState<L.Map | null>(null)
  const [start_pos, setPos] = useState<L.LatLng>(() => getRandomLatLng())

  function refreshMap () {
    const new_center: L.LatLng = getRandomLatLng()
    setPos(new_center)
    if (map) {
      map.setView(new_center)
    }
  }

  return (
    <>
      <MapComponent 
        start_pos={start_pos}
        map={map}
        setMap={setMap}
        />
      <Button 
        id="play-button" 
        variant="primary"
        onClick={() => refreshMap()}
        >
        Play
      </Button>
    </>
  )
}

export default App
