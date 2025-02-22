import { MapContainer, WMSTileLayer } from 'react-leaflet'
import MapComponents  from './MapComponents.tsx'

function ViewMap({start_pos, pick_score, setPos, setScore, random_latlng}:
                       { start_pos: L.LatLng,
                         pick_score: number,
                         setPos: Function, 
                         setScore: Function,
                         random_latlng: Function
                        })

{
	const wmsOptions: L.WMSOptions = {
		version: '1.1.1.1',
		//layers: 'avoindata:Ortoilmakuva_2019_20cm',
    layers: 'avoindata:Ortoilmakuva',
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
        <MapContainer id="map" {...mapOptions}>
          <WMSTileLayer
            url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
            {...wmsOptions}
          />
          <MapComponents start_pos={start_pos} pick_score={pick_score} setPos={setPos} setScore={setScore} random_latlng={random_latlng}/>
        </MapContainer>
      </>
  )
}

export default ViewMap
