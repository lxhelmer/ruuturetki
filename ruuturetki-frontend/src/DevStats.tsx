import { useState, useEffect} from 'react'
import { getDistance } from 'geolib'
import { useMap } from 'react-leaflet'

function DevStats( {start_pos, pick_score}: {start_pos: L.LatLng, pick_score: number} ) {
  const [pos, setPos] = useState(start_pos)
  const [maxDist, setDist] = useState(0)
  const map = useMap()
  useEffect(() => {
    setPos(start_pos)
    setDist(0)
  }, [start_pos])

  function distUpdate (new_pos: L.LatLng) {
    const distance = getDistance(
      { latitude: start_pos.lat, longitude: start_pos.lng},
      { latitude: pos.lat, longitude: pos.lng},
    )
    if (distance > maxDist) {
        setDist(distance)
    }
    setPos(new_pos)
  }


  const onMove = () => {
    distUpdate(map.getCenter())
  }

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <h2 id="dev-stat">
      latitude: {pos.lat.toFixed(4)}, longitude: {pos.lng.toFixed(4)}{'  '}
      maximum distance: {maxDist}{'  '}
      picker score: {pick_score}{'  '}
    </h2>
  )
}

export default DevStats
