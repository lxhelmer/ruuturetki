import L from 'leaflet'
import { useMapEvents, useMap, Marker } from 'react-leaflet'
import { getDistance } from 'geolib'
import { useEffect } from 'react'
import markerIcon from './MarkerIcon.tsx'

function LocationPicker({pickPosition, setPosition, start_pos, setPickScore}:
                        { pickPosition: L.LatLng | null,
                          setPosition: Function, 
                          start_pos: L.LatLng
                          setPickScore: Function
                        }) {

  const mapInstance = useMap()
  useEffect(() => {
    setPosition(null)
    mapInstance.setView(L.latLng(60.18, 24.95), 11)
    
  }, [start_pos])

  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng)
      if (pickPosition) {
        setPickScore(getDistance(
          { latitude: start_pos.lat, longitude: start_pos.lng},
          { latitude: pickPosition.lat, longitude: pickPosition.lng},
        ))
      }
    },
    mouseover: () => {
      map.invalidateSize();
    },
    mouseout: () => {
      map.invalidateSize();
    }
  })
  return pickPosition === null ? null : (
    <Marker position={pickPosition} icon={markerIcon}/>
  )
}

export default LocationPicker
