import L from 'leaflet'
import { useMapEvents, useMap, Marker } from 'react-leaflet'
import { getDistance } from 'geolib'
import { useEffect } from 'react'
import markerIcon from './MarkerIcon.tsx'

function LocationPicker({
  pickerPosition,
  setPickerPosition,
  startPosition,
  setPickScore
}: {
  pickerPosition: L.LatLng | null,
  setPickerPosition: Function,
  startPosition: L.LatLng
  setPickScore: Function
}) {

  const mapInstance = useMap()
  useEffect(() => {
    setPickerPosition(null)
    mapInstance.setView(L.latLng(60.18, 24.95), 11)

  }, [startPosition])

  const map = useMapEvents({
    click: (e) => {
      console.log('Clicked a position on SelectionMap:', e.latlng)
      setPickerPosition(e.latlng)
      if (pickerPosition) {
        setPickScore(getDistance(
          { latitude: startPosition.lat, longitude: startPosition.lng },
          { latitude: pickerPosition.lat, longitude: pickerPosition.lng },
        ))
      }
    },
    mouseover: () => {
      map.invalidateSize()
    },
    mouseout: () => {
      map.invalidateSize()
    }
  })
  
  return pickerPosition === null
    ? null
    : <Marker position={pickerPosition} icon={markerIcon} />
}

export default LocationPicker