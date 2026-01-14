import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import markerIcon from "../MarkerIcon.tsx";
import { GameState } from "../../types.ts";
import L from "leaflet";

function ModalButton({
  roundId,
  handleCloseREM,
}: {
  roundId: number;
  handleCloseREM: () => void;
}) {
  return (
    <>
      <Button variant="secondary" onClick={handleCloseREM}>
        {roundId < 4 ? "Next" : "End"}
      </Button>
    </>
  );
}

function FitBounds({
  bounds,
  delay,
  guessedLocation,
}: {
  bounds: L.LatLngBounds;
  delay: number;
  guessedLocation: L.LatLng;
}) {
  const map = useMap();
  if (guessedLocation.equals(L.latLng(0, 0))) {
    // Guessed location is equal to (0, 0) in timed mode if not guessed in time
    // Return without trying to fit the map to bounds
    return null;
  }
  // Fit the map to bounds after the delay
  setTimeout(() => {
    try {
      map.fitBounds(bounds);
    } catch (error) {
      console.log("Unable to fit roundEndModal map to bounds!", error);
    }
  }, delay);
  return (
    <Marker position={guessedLocation} icon={markerIcon}>
      <Tooltip permanent>Your guess</Tooltip>
    </Marker>
  );
}

const ModalMap = ({ gameState }: { gameState: GameState }) => {
  const correctLocation: L.LatLng = gameState.locations[gameState.roundId];
  const guessedLocation: L.LatLng = gameState.guesses[gameState.roundId];
  const bounds = L.latLngBounds([correctLocation, guessedLocation]);
  const delay = 1000; // After this time the map is fit to the bounds of the location and the guess
  const resultMapOptions: L.MapOptions = {
    center: correctLocation,
    zoom: 13,
    scrollWheelZoom: true,
  };
  // console.log('REM gameState:', gameState)
  return (
    <MapContainer id="results-map" {...resultMapOptions}>
      <TileLayer
        attribution={
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
        url={
          "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
        }
      />
      <Marker position={correctLocation} icon={markerIcon}>
        <Tooltip permanent>The correct answer</Tooltip>
      </Marker>
      <FitBounds
        bounds={bounds}
        delay={delay}
        guessedLocation={guessedLocation}
      />
    </MapContainer>
  );
};

function RoundEndModal({
  gameState,
  show,
  handleCloseREM,
}: {
  gameState: GameState;
  show: boolean;
  handleCloseREM: () => void;
}) {
  if (!show) {
    return null;
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseREM}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Round {gameState.roundId + 1}/5 score:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="modal-content">
            <h2>{gameState.score[gameState.roundId]} points for the round!</h2>
            <ModalMap gameState={gameState} />
            <h2 id="modal-score">
              {gameState.score.reduce((a, c) => a + c, 0)} /{" "}
              {gameState.roundId + 1}0 000 total points
            </h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton
            roundId={gameState.roundId}
            handleCloseREM={handleCloseREM}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RoundEndModal;
