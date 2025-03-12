import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet'
import { useState } from 'react'
import DevStats from './DevStats.tsx'
import RoundEndModal from './modals/RoundEndModal.tsx'
import type { GameState } from './Game.tsx'
import { useNavigate } from 'react-router-dom'



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
    setDist,
    picker_pos,
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
     picker_pos: L.LatLng | null,
    })
  {


  const map = useMap()
  const [showREM, setShowREM] = useState(false)
  const [round_score, setScore] = useState(0)
  const navigate = useNavigate()

  const handleCloseREM = () => {
    if (gameState.rounds == 5) {
      setShowREM(false)
      refreshMap()
    }
    else {
      setShowREM(false)
      navigate("/")
    }
  }

  const handleShowREM = () => setShowREM(true)

  function refreshMap () {
    const new_center: L.LatLng = random_latlng()
    setPos(new_center)
    setScore(0)
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
          Reset map
        </Button>
      </>
    )
  }

  function SelectButton () {

    const endRound = () => {
      if (gameState.picked === true) {
          const score = Math.max((10000 - pick_score*2 - maxDist*2.5), 0)

          setScore(score)
          const new_state = {
            rounds: gameState.rounds + 1,
            locations: gameState.locations.concat(start_pos),
            guesses: gameState.guesses.concat((picker_pos) ? picker_pos : L.latLng(0,0)),
            score: gameState.score + score,
            picked: true,
            skipped: gameState.skipped,
          }
          setGameState(new_state)
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
    const skipMap =  () =>  {
      if (gameState.rounds === 4) {
        setShowREM(true)
      } else {
        const new_state = {
          rounds: gameState.rounds + 1,
          locations: gameState.locations.concat(start_pos),
          guesses: gameState.guesses.concat(L.latLng(0,0)),
          score: gameState.score,
          picked: false,
          skipped: gameState.skipped + 1
        }
        setGameState(new_state)
        refreshMap()
      }
    }
    return (
      <>
        <Button 
          id="select-button" 
          variant="dark"
          onClick={() => skipMap()}
          >
          Skip
        </Button>
      </>
    )
  }
  return (
      <>
        <RoundEndModal
          gameState={gameState}
          show={showREM}
          handleCloseREM={handleCloseREM}
          round_score = {round_score}
        />
        <div id="controls">
          <ResButton/>
          <SelectButton/>
          <SkipButton/>
          <Button 
            id="home-button" 
            variant="dark"
            onClick={() => navigate('/')}
            >
            Exit
          </Button>
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
