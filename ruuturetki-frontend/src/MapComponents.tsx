import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet'
import { useState } from 'react'
import DevStats from './DevStats.tsx'
import RoundEndModal from './RoundEndModal.tsx'
import type { GameState } from './Game.tsx'



function MapComponents (
  {
    start_pos,
    pick_score,
    setPos,
    setPickScore,
    random_latlng,
    gameState,
    setGameState,
    maxDist,
    setDist
  }:
   { start_pos: L.LatLng,
     pick_score: number,
     setPos: Function,
     setPickScore: Function,
     random_latlng: Function,
     gameState: GameState,
     setGameState: Function,
     maxDist: number,
     setDist: Function,
    })
  {


  const map = useMap()
  const [showREM, setShowREM] = useState(false)
  const [round, setRound] = useState(gameState.rounds)
  const [score, setScore] = useState(0)

  const handleCloseREM = () => setShowREM(false)
  const handleShowREM = () => setShowREM(true)

  function refreshMap () {
    const new_center: L.LatLng = random_latlng()
    setPos(new_center)
    setPickScore(0)
    map.setView(new_center)
  }

  function ResButton () {
    const resetMap = () => {
      map.setView(start_pos)
    }
    return (
      <>
        <Button 
          id="reset-button" 
          variant="dark"
          onClick={() => resetMap()}
          >
          Go Back
        </Button>
      </>
    )
  }

  function SelectButton () {

    const endRound = () => {
      if (gameState.picked === false) {
          const score = 10000 - pick_score*2 - maxDist*2.5
          const new_state = {
            rounds: gameState.rounds + 1,
            locations: gameState.locations.concat(start_pos),
            guesses: gameState.guesses.concat(pick_score),
            score: gameState.score + score,
            picked: false
          }
          setGameState(new_state)
          setRound(new_state.rounds)
          setScore(score)
          handleShowREM()
      }
    }
    return (
      <>
        <Button 
          id="select-button" 
          variant="dark"
          onClick={() => endRound()}
          >
          Select
        </Button>
      </>
    )
  }
  function SkipButton () {
    return (
      <>
        <Button 
          id="select-button" 
          variant="dark"
          onClick={() => refreshMap()}
          >
          Skip
        </Button>
      </>
    )
  }
  return (
      <>
        <RoundEndModal
          score={score}
          round={round}
          show={showREM}
          handleCloseREM={handleCloseREM}
          refreshMap={refreshMap}
        />
        <div id="controls">
          <ResButton/>
          <SelectButton/>
          <SkipButton/>
        </div>
        <DevStats 
          start_pos = {start_pos}
          pick_score = {pick_score}
          maxDist={maxDist}
          setDist={setDist}
          gameState={gameState}
        />
      </>
  )
}

export default MapComponents
