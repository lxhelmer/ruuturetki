import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { MapContainer, WMSTileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import './App.css'

function App() {
	const wmsOptions: L.WMSOptions = {
		version: '1.1.1.1',
		layers: 'avoindata:Ortoilmakuva_2019_20cm',
		format:'image/png',
		transparent: false,
	};

  const southBoundLat: number = 60.13
  const northBoundLat: number = 60.295
  const eastBoundLon: number = 25.20
  const westBoundLon: number = 24.82

  const randomLat: number = Math.random() * (northBoundLat - southBoundLat) + southBoundLat
  const randomLon: number = Math.random() * (eastBoundLon - westBoundLon) + westBoundLon

  const mapOptions: L.MapOptions = {
    center: L.latLng(randomLat, randomLon),
    zoom: 18,
    scrollWheelZoom: false,
  };

  const [map, setMap] = useState<typeof map | null> (null)



  return (
    <>
			<MapContainer id="map" {...mapOptions}>
				<WMSTileLayer
					url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
					{...wmsOptions}
				/>
			</MapContainer>
      <Button 
        id="play-button" 
        variant="primary"
        onClick={() => window.location.reload()}
        >
        Play
      </Button>
    </>
  )
}

export default App
