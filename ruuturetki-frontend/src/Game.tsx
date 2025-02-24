import { useState, useEffect } from 'react'
import L from 'leaflet'
import SelectionMap from './SelectionMap.tsx'
import ViewMap from './ViewMap.tsx'
import { getDistance } from 'geolib'

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

type GameState = {
  rounds: number,
  locations: L.LatLng[],
  guesses: L.LatLng[],
  score: number,
  picked: boolean,
}

const startState: GameState = {
  rounds: 0,
  locations: [],
  guesses: [],
  score: 0,
  picked: false,
}

function Game() {
  const [start_pos, setPos] = useState<L.LatLng>(() => getRandomLatLng())
  const [picker_pos, setPosition] = useState<L.LatLng | null>(null)
  const [pick_score, setPickScore] = useState(0)
  const [gameState, setGameState] = useState<GameState>(startState)
  const [maxDist, setDist] = useState(0)

  useEffect(() => {
    if (picker_pos) {
      const score = getDistance(
        { latitude: start_pos.lat, longitude: start_pos.lng},
        { latitude: picker_pos.lat, longitude: picker_pos.lng},
      )
      setPickScore(score)
    }
    if (picker_pos && gameState.picked === false) {
      setGameState({...gameState, picked: true})
    }
  }, [picker_pos])


  return (
    <>
      <SelectionMap
          picker_pos = {picker_pos}
          setPosition = {setPosition}
          start_pos = {start_pos}
          setPickScore = {setPickScore}
         />
      <ViewMap
        start_pos={start_pos}
        pick_score={pick_score}
        setPos={setPos}
        setPickScore={setPickScore}
        random_latlng={getRandomLatLng}
        gameState={gameState}
        setGameState={setGameState}
        maxDist={maxDist}
        setDist={setDist}
        picker_pos = {picker_pos}
        />
    </>
  )
}

export default Game
export type { GameState }
