import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import { Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet'
import { useState } from 'react'
import DevStats from './DevStats.tsx'
import RoundEndModal from './RoundEndModal.tsx'



function MapComponents (
  {
    start_pos,
    pick_score,
    setPos,
    setPickScore,
    random_latlng,
    setRoundScore,
    maxDist,
    setDist
  }:
   { start_pos: L.LatLng,
     pick_score: number,
     setPos: Function, 
     setPickScore: Function,
     random_latlng: Function,
     setRoundScore: Function,
     maxDist: number,
     setDist: Function,
    })
  {

  const map = useMap()
  const [showREM, setShowREM] = useState(false)

  const handleCloseREM = () => setShowREM(false)
  const handleShowREM = () => setShowREM(true)

  const score = 10000 - pick_score*2 - maxDist*2.5

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
    return (
      <>
        <Button 
          id="select-button" 
          variant="dark"
          onClick={() => handleShowREM()}
          >
          Select
        </Button>
      </>
    )
  }
  function SkipButton () {
    const refreshMap = () => {
      const new_center: L.LatLng = random_latlng()
      setPos(new_center)
      setPickScore(0)
      map.setView(new_center)
    }
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
          show={showREM}
          handleCloseREM={handleCloseREM}
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
        />
      </>
  )
}

export default MapComponents
