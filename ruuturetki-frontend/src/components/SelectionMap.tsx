import L from 'leaflet'
import { MapContainer, TileLayer, } from 'react-leaflet'
import LocationPicker from './LocationPicker.tsx'

function SelectionMap ({picker_pos, setPosition, start_pos, setPickScore}:
                        { picker_pos: L.LatLng | null,
                          setPosition: Function, 
                          start_pos: L.LatLng
                          setPickScore: Function
                        }) {

  const zone_bounds: L.LatLngBounds = L.latLngBounds(L.latLng(60.13, 24.82), L.latLng(60.295, 25.20))
  const zone_center: L.LatLng = zone_bounds.getCenter()
  const picker_bounds: L.LatLngBounds = zone_center.toBounds(30000)
  const selectorMapOptions: L.MapOptions = {
    center: L.latLng(60.18, 24.95),
    zoom: 11,
    scrollWheelZoom: true,
    maxBounds: picker_bounds,
  }

  return (
      <MapContainer id ="selector-map" {...selectorMapOptions}>
        <TileLayer
          attribution={'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
          url={'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png'}
        />
        <LocationPicker 
          pickPosition = {picker_pos}
          setPosition = {setPosition}
          start_pos = {start_pos}
          setPickScore = {setPickScore}
          />
      </MapContainer>
  )
}

export default SelectionMap
