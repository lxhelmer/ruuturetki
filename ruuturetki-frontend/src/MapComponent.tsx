import { useState, useEffect} from 'react'
import { MapContainer, WMSTileLayer } from 'react-leaflet'
import { getDistance } from 'geolib'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import './App.css'



function ViewPosition( {map, start_pos}: {map: L.Map, start_pos: L.LatLng} ) {
  const [pos, setPos] = useState(start_pos)
  const [maxDist, setDist] = useState(0)
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
    <p>
      latitude: {pos.lat.toFixed(4)}, longitude: {pos.lng.toFixed(4)}{' '}
      maximum distance: {maxDist}
    </p>
  )
}

function MapComponent ({start_pos, map, setMap}: {start_pos: L.LatLng, map: L.Map | null, setMap: Function}) {
  
	const wmsOptions: L.WMSOptions = {
		version: '1.1.1.1',
		layers: 'avoindata:Ortoilmakuva_2019_20cm',
		format:'image/png',
		transparent: false,
	};

  const mapOptions: L.MapOptions = {
    center: start_pos,
    zoom: 17,
    scrollWheelZoom: false,
  };
  return (
      <>
        <MapContainer id="map" {...mapOptions} ref={setMap}>
          <WMSTileLayer
            url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
            {...wmsOptions}
          />
        </MapContainer>
        <div id="latlon-overlay">
          {map ? <ViewPosition map = {map} start_pos = {start_pos}/> : null}
        </div>
      </>
  )
}

export default MapComponent
