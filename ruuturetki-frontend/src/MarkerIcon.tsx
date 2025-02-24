import icon_img from 'leaflet/dist/images/marker-icon.png';
import iconShadow_img from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet'

const markerIcon = L.icon({
    iconUrl : icon_img,
    shadowUrl: iconShadow_img,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})

export default markerIcon
