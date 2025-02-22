import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import { Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet'
import DevStats from './DevStats.tsx'



function MapComponents (
  {
    start_pos,
    pick_score,
    setPos,
    setPickScore,
    random_latlng
  }:
   { start_pos: L.LatLng,
     pick_score: number,
     setPos: Function, 
     setPickScore: Function,
     random_latlng: Function
    })
  {

  const map = useMap()

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
          Select
        </Button>
      </>
    )
  }
  return (
      <>
        <div id="controls">
          <ResButton/>
          <SelectButton/>
        </div>
        <DevStats start_pos = {start_pos} pick_score = {pick_score}/>
      </>
  )
}

export default MapComponents
