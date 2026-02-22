import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationPicker from "./LocationPicker.tsx";
import { GameSettings, GameState } from "../types/types.ts";
import { cityForMapLayer, tileLayerOptions } from "../utils/mapLayerHelpers.ts";

function SelectionMap({
  gameState,
  setGameState,
  gameSettings,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameSettings: GameSettings;
}) {
  let zone: L.LatLng[] = [];
  let selectorMapOptions: L.MapOptions = {};
  const city = cityForMapLayer(gameSettings.ortolayer);
  if (city === "Helsinki") {
    zone = [L.latLng(60.13, 24.82), L.latLng(60.295, 25.2)];
    const zoneCenter: L.LatLng = L.latLngBounds(zone).getCenter();
    const pickerBounds: L.LatLngBounds = zoneCenter.toBounds(30000);
    selectorMapOptions = {
      center: zoneCenter,
      zoom: 11,
      scrollWheelZoom: true,
      maxBounds: pickerBounds,
    };
  } else if (city === "Turku") {
    zone = [L.latLng(60.428, 22.228), L.latLng(60.468, 22.289)];
    const zoneCenter: L.LatLng = L.latLngBounds(zone).getCenter();
    const pickerBounds: L.LatLngBounds = zoneCenter.toBounds(10000);
    selectorMapOptions = {
      center: zoneCenter,
      zoom: 11,
      scrollWheelZoom: true,
      maxBounds: pickerBounds,
    };
  }

  return (
    <MapContainer id="selector-map" {...selectorMapOptions}>
      <TileLayer {...tileLayerOptions()} />
      <LocationPicker gameState={gameState} setGameState={setGameState} />
    </MapContainer>
  );
}

export default SelectionMap;
