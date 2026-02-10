import { MapContainer, WMSTileLayer, WMSTileLayerProps } from "react-leaflet";
import { useState, useEffect } from "react";
import PracticeComponents from "./PracticeComponents";
import L from "leaflet";
import Curator from "./Curator";
import { GameSettings, WMSOptions } from "../types/types";

function OrtoLayer({
  mapLayer,
  wmsOptions,
}: {
  mapLayer: string;
  wmsOptions: WMSOptions;
}) {
  const options: WMSTileLayerProps = {
    url: wmsOptions.wmsurl,
    attribution: wmsOptions.attribution,
    version: wmsOptions.wmsversion,
    format: wmsOptions.wmsformat,
  };
  return <WMSTileLayer layers={mapLayer} {...options} />;
}

function Practice({
  ortolayersHelsinki,
  ortolayersTurku,
}: {
  ortolayersHelsinki: GameSettings["ortolayer"][];
  ortolayersTurku: GameSettings["ortolayer"][];
}) {
  const [renderKey, setKey] = useState(1);
  const [mapLayer, setMapLayer] = useState("avoindata:Ortoilmakuva_2024_5cm");
  const [practicePos, setPracticePos] = useState(
    L.latLng(60.170678, 24.941543), // Default location Helsinki Central Station
  );
  const [practiceZoom, setPracticeZoom] = useState(15); // Default zoom level 15
  const [city, setCity] = useState<"Helsinki" | "Turku">("Helsinki");

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

  const wmsOptions: WMSOptions =
    city === "Helsinki"
      ? {
          ortolayer: "avoindata:Ortoilmakuva_2019_20cm",
          wmsurl: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
          attribution:
            '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
          wmsversion: "1.1.1.1",
          wmsformat: "image/png",
        }
      : {
          ortolayer: "Ilmakuva 2022 True ortho",
          wmsurl: "https://turku.asiointi.fi/teklaogcweb/WMS.ashx",
          attribution:
            '&copy; <a href=https://www.avoindata.fi/data/fi/dataset/turun-seudun-ilmakuva target="_blank">Turun Kaupunkiympäristö</a>',
          wmsversion: "1.1.1",
          wmsformat: "image/png",
        };

  const ortolayers = city === "Helsinki" ? ortolayersHelsinki : ortolayersTurku;

  return (
    <>
      <MapContainer id="map" {...mapOptions} key={renderKey}>
        <OrtoLayer mapLayer={mapLayer} wmsOptions={wmsOptions} />
        <PracticeComponents
          mapLayer={mapLayer}
          setMapLayer={setMapLayer}
          setPracticePos={setPracticePos}
          setPracticeZoom={setPracticeZoom}
          ortolayers={ortolayers}
          city={city}
          setCity={setCity}
        />
        <Curator mapLayer={mapLayer} />
      </MapContainer>
    </>
  );
}

export default Practice;
