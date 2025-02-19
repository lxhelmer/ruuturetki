import { useState, } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import { Button } from 'react-bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
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

function LocationPicker() {
  const [position, setPosition] = useState<L.LatLng | null>(null)
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng)
    },
  })
  return position === null ? null : (
    <Marker position={position}/>
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
  const selectorOptions: L.MapOptions = {
    center: L.latLng(60.18, 24.95),
    zoom: 11,
    scrollWheelZoom: true,
  };

  return (
    <>
      <MapContainer id ="selector-map" {...selectorOptions}>
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}'
          ext='png'
        />
        <LocationPicker />
      </MapContainer>
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
