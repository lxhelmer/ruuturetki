import { useState, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import './App.css'
import MapComponent from './MapComponent.tsx'
import SelectionMap from './SelectionMap.tsx'
import ViewMap from './ViewMap.tsx'
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



  return (
    <>
      <SelectionMap 
          picker_pos = {picker_pos}
          setPosition = {setPosition}
          start_pos = {start_pos}
          setScore = {setScore}
         /> 
      <ViewMap start_pos={start_pos} pick_score={pick_score} setPos={setPos} setScore={setScore} random_latlng={getRandomLatLng}/>
    </>
  )
}

export default App
