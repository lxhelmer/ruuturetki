import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import { Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet'
import DevStats from './DevStats.tsx'



function MapComponents ({start_pos, pick_score, setPos, setScore, random_latlng}:
                       { start_pos: L.LatLng,
                         pick_score: number,
                         setPos: Function, 
                         setScore: Function,
                         random_latlng: Function
                        })
{
  const map = useMap()
  const map_bounds: L.LatLngBounds = start_pos.toBounds(3500)
  map.setMaxBounds(map_bounds)


  

  function ResButton () {
    const resetMap = () => {
      if (map) {
        map.setView(start_pos)
      }
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
      console.log(new_center)
      setPos(new_center)
      setScore(0)
      if (map) {
        map.setView(new_center)
      }
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
