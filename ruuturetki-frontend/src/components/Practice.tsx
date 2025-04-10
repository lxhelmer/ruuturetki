import { MapContainer, WMSTileLayer } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { getRandomLatLng } from './Game'
import PracticeComponents from './PracticeComponents'

function OrtoLayer({ map }:
  {
    map: string,
  }) {
  const wmsOptions: L.WMSOptions = {
    version: '1.1.1.1',
    layers: map,
    format: 'image/png',
    transparent: false,
  };
  return (
    <WMSTileLayer
      url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
      attribution={'&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>'}
      {...wmsOptions}
    />
  )
}
function Practice () {

  const [renderKey, setKey] = useState(1)
  const [map, setMap] = useState('avoindata:Ortoilmakuva_2024_5cm')

  //key trick for forcing rerender on the map
  useEffect(() => {
    setKey(prevKey => prevKey + 1)
  }, [map])

  const mapOptions: L.MapOptions = {
    center: getRandomLatLng(),
    zoom: 17,
    scrollWheelZoom: true,
    maxBoundsViscosity: 0.9,
    zoomControl: true,
    boxZoom: false,
    doubleClickZoom: false,
  };

  return (
    <>
      <MapContainer 
        id="map" {...mapOptions}
        key={renderKey}
        >
        <OrtoLayer 
          map={map}
        />
        <PracticeComponents
          map = {map}
          setMap = {setMap}
        />
      </MapContainer>
    </>
  )
}

export default Practice
