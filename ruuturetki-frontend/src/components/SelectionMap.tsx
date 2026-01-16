import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationPicker from "./LocationPicker.tsx";
import { GameSettings, GameState } from "../types.ts";

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
  if (gameSettings.city === "Helsinki") {
    zone = [L.latLng(60.13, 24.82), L.latLng(60.295, 25.2)];
  } else if (gameSettings.city === "Turku") {
    zone = [L.latLng(60.428, 22.228), L.latLng(60.468, 22.289)];
  }
  // Default settings for the selection map
  const zoneBounds: L.LatLngBounds = L.latLngBounds(zone);
  const zoneCenter: L.LatLng = zoneBounds.getCenter();
  const pickerBounds: L.LatLngBounds = zoneCenter.toBounds(30000);
  const selectorMapOptions: L.MapOptions = {
    center: zoneCenter,
    zoom: 11,
    scrollWheelZoom: true,
    maxBounds: pickerBounds,
  };

  return (
    <MapContainer id="selector-map" {...selectorMapOptions}>
      <TileLayer
        attribution={
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
        url={
          "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
        }
      />
      <LocationPicker gameState={gameState} setGameState={setGameState} />
    </MapContainer>
  );
}

export default SelectionMap;
