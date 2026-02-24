import { MapContainer, TileLayer } from "react-leaflet";
import LocationPicker from "./LocationPicker.tsx";
import { GameSettings, GameState } from "../types/types.ts";
import {
  selectorMapOptionsForMapLayer,
  tileLayerOptions,
} from "../utils/mapLayerHelpers.ts";

function SelectionMap({
  gameState,
  setGameState,
  gameSettings,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameSettings: GameSettings;
}) {
  const mapLayerName = gameSettings.ortolayer;
  const selectorMapOptions = selectorMapOptionsForMapLayer(mapLayerName);

  return (
    <MapContainer id="selector-map" {...selectorMapOptions}>
      <TileLayer {...tileLayerOptions()} />
      <LocationPicker
        gameState={gameState}
        setGameState={setGameState}
        mapLayerName={mapLayerName}
      />
    </MapContainer>
  );
}

export default SelectionMap;
