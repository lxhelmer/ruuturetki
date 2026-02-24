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
import { GameState } from "../../types/types.ts";
import L from "leaflet";
import { tileLayerOptions } from "../../utils/mapLayerHelpers.ts";

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
  if (guessedLocation === undefined) {
    // Guessed location is undefined when it is the last round and
    // skip is clicked without selecting a guess location
    // Return without trying to fit the map to bounds
    return null;
  }
  if (guessedLocation.equals(L.latLng(0, 0))) {
    // Guessed location is equal to (0, 0) in timed mode if not guessed in time
    // Return without trying to fit the map to bounds
    return null;
  }
  // Fit the map to bounds after the delay
  setTimeout(() => {
    try {
      map.fitBounds(bounds, { padding: [50, 50] });
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
      <TileLayer {...tileLayerOptions()} />
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

  const roundNumber = gameState.roundId + 1;
  const roundScore = gameState.score[gameState.roundId];
  const totalScore = gameState.score.reduce((a, c) => a + c, 0);

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
          <Modal.Title>Round {roundNumber}/5 score:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="modal-content">
            <h2>{roundScore} points for the round!</h2>
            {roundScore !== 0 && (
              <meter
                value={roundScore}
                max={10000}
                low={4000}
                high={8000}
                optimum={9000}
              />
            )}
            <ModalMap gameState={gameState} />
            <h2 id="modal-score">
              {totalScore} / {roundNumber}0 000 total points
            </h2>
            {totalScore !== 0 && (
              <meter
                value={totalScore}
                max={10000 * roundNumber}
                low={4000 * roundNumber}
                high={8000 * roundNumber}
                optimum={9000 * roundNumber}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseREM}>
            {roundNumber < 5 ? "Next" : "End"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RoundEndModal;
