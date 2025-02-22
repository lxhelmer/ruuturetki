import L from 'leaflet'
import { useMapEvents, Marker } from 'react-leaflet'
import icon_img from 'leaflet/dist/images/marker-icon.png';
import iconShadow_img from 'leaflet/dist/images/marker-shadow.png';
import { getDistance } from 'geolib'

const markerIcon = L.icon({
    iconUrl : icon_img,
    shadowUrl: iconShadow_img,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})

function LocationPicker({pickPosition, setPosition, start_pos, setPickScore}:
                        { pickPosition: L.LatLng | null,
                          setPosition: Function, 
                          start_pos: L.LatLng
                          setPickScore: Function
                        }) {
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
