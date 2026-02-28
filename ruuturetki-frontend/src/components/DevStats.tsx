import { getDistance } from "geolib";
import { GameState } from "../types/types";

function DevStats({ gameState }: { gameState: GameState }) {
  if (!gameState.user || (gameState.user && !gameState.user.admin)) {
    return null;
  }
  // Get the state of the game
  const startPosition = gameState.locations[gameState.roundId];
  const guessedLocation = gameState.guesses[gameState.roundId];
  const distanceMoved = gameState.distanceMoved;
  let pickScore: number | undefined = undefined;

  // Narrow type
  if (guessedLocation !== undefined) {
    pickScore = getDistance(
      {
        latitude: startPosition.lat,
        longitude: startPosition.lng,
      },
      {
        latitude: guessedLocation.lat,
        longitude: guessedLocation.lng,
      },
    );
  }

  return (
    <div id="dev-stat">
      <h2>
        {`latitude: ${startPosition.lat.toFixed(4)}, 
          longitude: ${startPosition.lng.toFixed(4)},
          maximum distance: ${distanceMoved},
          pick score: ${pickScore}`}
      </h2>
      <h1>
        {`round: ${gameState.roundId + 1}
          round scores: ${gameState.score.reduce(
            (a, c) => a + `[${c}],`,
            "",
          )}      
          picked: ${gameState.picked}`}
      </h1>
    </div>
  );
}

export default DevStats;
