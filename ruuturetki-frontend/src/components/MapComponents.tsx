import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet'
import { useState } from 'react'
import DevStats from './DevStats.tsx'
import RoundEndModal from './modals/RoundEndModal.tsx'
import type { GameState } from './Game.tsx'
import { useNavigate } from 'react-router-dom'
import gameService from '../services/games'
import LoginBanner from './LoginBanner'
import { GameSettings } from '../types.tsx'
import useInterval from './useInterval.tsx'

const Timer = ({
  timer,
  setTimer,
  handleEndRound
}: {
  timer: false | number,
  setTimer: Function,
  handleEndRound: Function
}) => {
  // Render timer component only if timed mode is selected.
  if (!timer) { return null }
  // Timer is in seconds but delay is in ms => * 100
  const [delay, setDelay] = useState<number | null>(timer * 100)

  // Custom hook
  useInterval(() => {
    setTimer((t: number) => {
      if (t <= 1) {
        console.log('Countdown finished.')
        // Set interval delay to null to stop the timer countdown
        setDelay(null)
        // In timed mode select button is disabled. Timer running to 0 is the only way to end a round.
        handleEndRound()
        // Reset the timer for the next round
        setTimer(timer)
      }
      return t - 1
    })
  }, delay)

  return (
    <Button
      variant="dark"
      id="timer-indicator"
      disabled
    >
      {timer.toString()}
    </Button>
  )
}

function SelectButton({
  handleEndRound,
  timed
}: {
  handleEndRound: Function,
  timed: false | number
}) {
  // Do not render select button if timed mode is selected.
  if (timed) { return null }
  return (
    <>
      <Button
        id="select-button"
        variant="dark"
        onClick={() => handleEndRound()}
      >
        Select
      </Button>
    </>
  )
}

function SkipButton({ handleSkipMap }: { handleSkipMap: Function }) {
  return (
    <>
      <Button
        id="select-button"
        variant="dark"
        onClick={() => handleSkipMap()}
      >
        Skip
      </Button>
    </>
  )
}

function ResButton({ handleResetMap }: { handleResetMap: Function }) {
  return (
    <>
      <Button
        id="reset-button"
        variant="dark"
        onClick={() => handleResetMap()}
      >
        Reset map
      </Button>
    </>
  )
}

function MapComponents(
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
    gameSettings
  }:
    {
      start_pos: L.LatLng,
      pick_score: number,
      setPos: Function,
      setPickScore: Function,
      random_latlng: Function,
      gameState: GameState,
      setGameState: Function,
      maxDist: number,
      setDist: Function,
      picker_pos: L.LatLng | null,
      gameSettings: GameSettings
    }) {


  const map = useMap()
  const [showREM, setShowREM] = useState(false)
  const [round_score, setScore] = useState(0)
  const [timer, setTimer] = useState(gameSettings.timed)
  const navigate = useNavigate()


  const handleCloseREM = () => {
    if (gameState.rounds < 5) {
      setShowREM(false)
      setGameState({ ...gameState, picked: false })
      refreshMap()
    }
    else {
      if (gameState.user && gameState.score > 0) {
        try {
          gameService.create({
            rounds: gameState.rounds - gameState.skipped,
            score: gameState.score,
            year: gameSettings.year
          })
        } catch (error) {
          console.log("Something went wrong with adding game", error)
        }
      }
      setShowREM(false)
      navigate("/")
    }
  }

  const handleShowREM = () => setShowREM(true)

  const handleEndRound = () => {
    console.log('handleEndRound() called. GameState:', gameState)

    let score = 0
    if (gameState.picked === false) {
      if (!gameSettings.timed) {
        /* Normal mode */

        // Implement here notification to the user to make a guess
        console.log(
          'Select clicked without setting a guess of the location.',
          'Try again after making a guess.'
        )
        // Give the user chance to make a guess
        // by stopping handleEndRound()
        return null
      } else {
        /* Timed mode */

        // Implement here notification to the user to be faster
        console.log(
          'Time run out before you made a guess of the location.',
          'Try being faster on the next round!'
        )
        // Score is set to 0 in the timed mode
        score = 0
      }
    } else {
      /* Both modes and a location succesfully guessed*/

      // Calculate the score of the guess
      score = Math.max((10000 - pick_score * 2 - maxDist * 2.5), 0)
    }
    console.log('setscore:', score)

    setScore(score)
    const newState = {
      rounds: gameState.rounds + 1,
      locations: gameState.locations.concat(start_pos),
      guesses: gameState.guesses.concat((picker_pos) ? picker_pos : L.latLng(0, 0)),
      score: gameState.score + score,
      picked: true,
      skipped: gameState.skipped,
      user: gameState.user
    }
    setGameState(newState)
    handleShowREM()
  }

  const handleSkipMap = async () => {
    // Different handling if it is the last round
    if (gameState.rounds === 4) {
      const new_state = {
        rounds: gameState.rounds + 1,
        locations: gameState.locations.concat(start_pos),
        guesses: gameState.guesses.concat(L.latLng(0, 0)),
        score: gameState.score,
        picked: false,
        skipped: gameState.skipped + 1,
        user: gameState.user,
      }
      await setGameState(new_state)
      setShowREM(true)
    } else {
      // Other than the last round
      const new_state = {
        rounds: gameState.rounds + 1,
        locations: gameState.locations.concat(start_pos),
        guesses: gameState.guesses.concat(L.latLng(0, 0)),
        score: gameState.score,
        picked: false,
        skipped: gameState.skipped + 1,
        user: gameState.user,
      }
      setGameState(new_state)
      refreshMap()
    }
  }
  const handleResetMap = () => {
    map.setView(start_pos)
  }

  const refreshMap = () => {
    const new_center: L.LatLng = random_latlng()
    setPos(new_center)
    setScore(0)
    setPickScore(0)
    map.setView(new_center)
  }

  return (
    <>
      <Button variant="dark" disabled id="round-indicator">
        {(gameState.rounds < 5) ? gameState.rounds + 1 : 5}/5
      </Button>

      <Timer
        timer={timer}
        setTimer={setTimer}
        handleEndRound={handleEndRound}
      />

      <RoundEndModal
        gameState={gameState}
        show={showREM}
        handleCloseREM={handleCloseREM}
        round_score={round_score}
      />
      <div id="controls">
        <ResButton handleResetMap={handleResetMap} />
        <SelectButton
          handleEndRound={handleEndRound}
          timed={gameSettings.timed}
        />
        <SkipButton handleSkipMap={handleSkipMap} />
        <Button
          id="home-button"
          variant="dark"
          onClick={() => navigate('/')}
        >
          Exit
        </Button>
      </div>
      <DevStats
        start_pos={start_pos}
        pick_score={pick_score}
        maxDist={maxDist}
        setDist={setDist}
        gameState={gameState}
      />
      <div id="log-banner">
        <LoginBanner user={gameState.user} />
      </div>
    </>
  )
}

export default MapComponents
