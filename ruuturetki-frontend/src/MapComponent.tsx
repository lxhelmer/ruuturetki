import { MapContainer, WMSTileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import { Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet'
import DevStats from './DevStats.tsx'



function MapComponent ({start_pos, pick_score, setPos, setScore, random_latlng}:
                       { start_pos: L.LatLng,
                         pick_score: number,
                         setPos: Function, 
                         setScore: Function,
                         random_latlng: Function
                        })
{
  function SelectButton () {
    const map = useMap()
    const resetMap = () => {
      if (map) {
        map.setView(start_pos)
      }
    }
    return (
      <>
        <Button 
          id="reset-button" 
          variant="primary"
          onClick={() => resetMap()}
          >
          Go Back
        </Button>
      </>
    )
  }

  function ResButton () {
    const map = useMap()
    const refreshMap = () => {
      const new_center: L.LatLng = random_latlng()
      console.log(new_center)
      setPos(new_center)
      setScore(0)
      if (map) {
        map.setView(new_center)
      }
    }
    return (
      <>
        <Button 
          id="select-button" 
          variant="primary"
          onClick={() => refreshMap()}
          >
          Select
        </Button>
      </>
    )
  }
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
          <SelectButton/>
          <ResButton/>
          <DevStats start_pos = {start_pos} pick_score = {pick_score}/>
        </MapContainer>
      </>
  )
}

export default MapComponent
