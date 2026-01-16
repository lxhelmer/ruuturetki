import { MapContainer, WMSTileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import PracticeComponents from "./PracticeComponents";
import L from "leaflet";
import Curator from "./Curator";

function OrtoLayer({ map }: { map: string }) {
  const wmsOptions: L.WMSOptions = {
    version: "1.1.1.1",
    layers: map,
    format: "image/png",
    transparent: false,
  };
  return (
    <WMSTileLayer
      url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
      attribution={
        '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>'
      }
      {...wmsOptions}
    />
  );
}

function Practice() {
  const [renderKey, setKey] = useState(1);
  const [mapLayer, setMapLayer] = useState("avoindata:Ortoilmakuva_2024_5cm");
  const [practicePos, setPracticePos] = useState(
    L.latLng(60.170678, 24.941543) // Default location Helsinki Central Station
  );
  const [practiceZoom, setPracticeZoom] = useState(15); // Default zoom level 15

  //key trick for forcing rerender on the map
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [mapLayer]);

  const mapOptions: L.MapOptions = {
    center: practicePos,
    zoom: practiceZoom,
    scrollWheelZoom: true,
    maxBoundsViscosity: 0.9,
    zoomControl: true,
    boxZoom: false,
    doubleClickZoom: false,
  };

  return (
    <>
      <MapContainer id="map" {...mapOptions} key={renderKey}>
        <OrtoLayer map={mapLayer} />
        <PracticeComponents
          mapLayer={mapLayer}
          setMapLayer={setMapLayer}
          setPracticePos={setPracticePos}
          setPracticeZoom={setPracticeZoom}
        />
        <Curator mapLayer={mapLayer}/>
      </MapContainer>
    </>
  );
}

export default Practice;
