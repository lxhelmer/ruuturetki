import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { MapContainer, WMSTileLayer } from 'react-leaflet'
import { getDistance } from 'geolib'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import './App.css'


const start_pos = L.latLng(60.1718, 24.9395)


function ViewPosition( {map, start_pos}: {map: L.Map, start_pos: L.LatLng} ) {
  console.log("passed", start_pos)
  const [pos, setPos] = useState(start_pos)
  console.log("pos", pos)
  const [maxDist, setDist] = useState(0)
  console.log(pos)

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

function getRandomLatLng () {
  const southBoundLat: number = 60.13
  const northBoundLat: number = 60.295
  const eastBoundLon: number = 25.20
  const westBoundLon: number = 24.82

  const randomLat: number = Math.random() * (northBoundLat - southBoundLat) + southBoundLat
  const randomLon: number = Math.random() * (eastBoundLon - westBoundLon) + westBoundLon
  
  return (
    L.latLng(randomLat, randomLon)
  )
}


function MapComponent () {
  
  function refreshMap () {
    if (map) {
      map.setView(getRandomLatLng())
    }
  }

	const wmsOptions: L.WMSOptions = {
		version: '1.1.1.1',
		layers: 'avoindata:Ortoilmakuva_2019_20cm',
		format:'image/png',
		transparent: false,
	};

  const [map, setMap] = useState<L.Map | null>(null)
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
        <Button 
          id="play-button" 
          variant="primary"
          onClick={() => refreshMap}
          >
          Play
        </Button>
        <div id="latlon-overlay">
          {map ? <ViewPosition map = {map} start_pos = {start_pos}/> : null}
        </div>
      </>
  )
}
function App() {


  return (
    <>
      <MapComponent/>
    </>
  )
}

export default App
