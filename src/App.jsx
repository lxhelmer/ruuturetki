import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MapContainer, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' 

function App() {
	const wmsProps = {
		version: '1.1.1.1',
		layers: 'avoindata:Ortoilmakuva_2019_20cm',
		format:'image/png',
		transparent: 'false',
	}
		

  return (
    <>
			<h1>RuutuRetki</h1>
			<MapContainer id="map" center={[60.19, 24.94]} zoom={18} scrollWheelZoom={true}>
				<WMSTileLayer
					url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
					{...wmsProps}
				/>
			</MapContainer>
    </>
  )
}

export default App
