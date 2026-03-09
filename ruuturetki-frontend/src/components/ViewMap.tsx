import { MapContainer, Marker, Popup } from "react-leaflet";
import MapComponents from "./MapComponents.tsx";
import { useState, useEffect } from "react";
import { GameSettings, GameState } from "../types/types.ts";
import { markerIconBlue } from "./MarkerIcon.tsx";
import { wmsOptionsForMapLayer } from "../utils/mapLayerHelpers.ts";
import { LimitedWMSTileLayer } from "./LimitedWMSTilelayer.tsx";

function ViewMap({
  gameState,
  setGameState,
  gameSettings,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameSettings: GameSettings;
}) {
  // Get the starting position of each round from gameState
  const startPosition = gameState.locations[gameState.roundId];

  // Set view map options
  const maxBounds: L.LatLngBounds = startPosition.toBounds(3800);
  const mapOptions: L.MapOptions = {
    center: startPosition,
    zoom: gameState.zooms[gameState.roundId],
    scrollWheelZoom: false,
    maxBounds: maxBounds,
    maxBoundsViscosity: 0.9,
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
    dragging: gameSettings.dragging,
  };

  // Get the wms options corresponding to the ortolayer name
  const wmsOptions = wmsOptionsForMapLayer(gameSettings.ortolayer);

  // key trick for forcing rerender on the WMS layer
  const [renderKey, setKey] = useState(1);
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [startPosition]);

  return (
    <>
      <MapContainer id="map" {...mapOptions} key={renderKey}>
        <LimitedWMSTileLayer key={renderKey} {...wmsOptions} />
        <Marker position={startPosition} icon={markerIconBlue}>
          <Popup>Try to match this position!</Popup>
        </Marker>
        <MapComponents
          gameState={gameState}
          setGameState={setGameState}
          gameSettings={gameSettings}
        />
      </MapContainer>
    </>
  );
}

export default ViewMap;
