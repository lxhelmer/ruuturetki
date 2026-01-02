import iconImg from 'leaflet/dist/images/marker-icon.png'
import iconShadowImg from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'

const markerIcon = L.icon({
    iconUrl: iconImg,
    shadowUrl: iconShadowImg,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})

export default markerIcon