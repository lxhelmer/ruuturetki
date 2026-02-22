import { MapContainer, WMSTileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import PracticeComponents from "./PracticeComponents";
import L from "leaflet";
import Curator from "./Curator";
import {
  MapLayerName,
  MapLayerNameHelsinki,
  MapLayerNameTurku,
} from "../types/types";
import { wmsOptionsForMapLayer } from "../utils/mapLayerHelpers";

function OrtoLayer({ mapLayer }: { mapLayer: MapLayerName }) {
  const wmsOptions = wmsOptionsForMapLayer(mapLayer);
  return <WMSTileLayer layers={mapLayer} {...wmsOptions} />;
}

function Practice({
  ortolayersHelsinki,
  ortolayersTurku,
}: {
  ortolayersHelsinki: MapLayerNameHelsinki[];
  ortolayersTurku: MapLayerNameTurku[];
}) {
  const [renderKey, setKey] = useState(1);
  const [mapLayer, setMapLayer] = useState<MapLayerName>(
    "avoindata:Ortoilmakuva_2024_5cm",
  );
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

  const ortolayers = city === "Helsinki" ? ortolayersHelsinki : ortolayersTurku;

  return (
    <>
      <MapContainer id="map" {...mapOptions} key={renderKey}>
        <OrtoLayer mapLayer={mapLayer} />
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
