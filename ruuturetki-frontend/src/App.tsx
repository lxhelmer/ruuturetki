import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import './App.css'
import MapComponent from './MapComponent.tsx'
import { getDistance } from 'geolib'

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

function LocationPicker({pickPosition, setPosition, start_pos, setScore}:
                        { pickPosition: L.LatLng | null,
                          setPosition: Function, 
                          start_pos: L.LatLng
                          setScore: Function
                        }) {
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng)

      if (pickPosition) {
        setScore(getDistance(
          { latitude: start_pos.lat, longitude: start_pos.lng},
          { latitude: pickPosition.lat, longitude: pickPosition.lng},
        ))
      }
    },
    mouseover: () => {
      map.invalidateSize();
    },
    mouseout: () => {
      map.invalidateSize();
    }
  })
  return pickPosition === null ? null : (
    <Marker position={pickPosition}/>
  )
}


function App() {
  const [start_pos, setPos] = useState<L.LatLng>(() => getRandomLatLng())
  const [picker_pos, setPosition] = useState<L.LatLng | null>(null)
  const [pick_score, setScore] = useState(0)

  useEffect(() => {
    if (picker_pos) {
      const score = getDistance(
        { latitude: start_pos.lat, longitude: start_pos.lng},
        { latitude: picker_pos.lat, longitude: picker_pos.lng},
      )
      setScore(score)
    }
  }, [picker_pos])

  const selectorOptions: L.MapOptions = {
    center: L.latLng(60.18, 24.95),
    zoom: 11,
    scrollWheelZoom: true,
  };


  return (
    <>
      <MapContainer id ="selector-map" {...selectorOptions}>
        <TileLayer
          attribution={'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
          url='https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png'
        />
        <LocationPicker 
          pickPosition = {picker_pos}
          setPosition = {setPosition}
          start_pos = {start_pos}
          setScore = {setScore}
        />
      </MapContainer>
      <MapComponent start_pos={start_pos} pick_score={pick_score} setPos={setPos} setScore={setScore} random_latlng={getRandomLatLng}/>
    </>
  )
}

export default App
