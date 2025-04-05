import { useState, useEffect } from 'react'
import L from 'leaflet'
import SelectionMap from './SelectionMap.tsx'
import ViewMap from './ViewMap.tsx'
import { getDistance } from 'geolib'
import gameService from '../services/games'
import { GameState, GameSettings } from '../types'

export function getRandomLatLng () {
  const southBoundLat: number = 60.19
  const northBoundLat: number = 60.29
  const eastBoundLon: number = 25.20
  const westBoundLon: number = 24.825

  const randomLat: number = Math.random() * (northBoundLat - southBoundLat) + southBoundLat
  const randomLon: number = Math.random() * (eastBoundLon - westBoundLon) + westBoundLon

  return (
    L.latLng(randomLat, randomLon)
  )
}

const startState: GameState = {
  rounds: 0,
  locations: [],
  guesses: [],
  score: 0,
  picked: false,
  skipped: 0,
  user: null
}

function Game({gameSettings}:{ gameSettings: GameSettings}) {
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


  useEffect(() => {
    const gameUserJSON = window.localStorage.getItem('gameUser')
    if (gameUserJSON) {
      const user = JSON.parse(gameUserJSON)
      setGameState({...gameState, user: user})
      gameService.setToken(user.token)
    } else {
      gameService.setToken('')
      setGameState({...gameState, user: null})
    }

  }, [])

  
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
        gameSettings = {gameSettings}
        />
    </>
  )
}

export default Game
export type { GameState }
