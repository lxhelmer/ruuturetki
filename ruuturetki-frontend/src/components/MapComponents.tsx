import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import DevStats from "./DevStats.tsx";
import RoundEndModal from "./modals/RoundEndModal.tsx";
import { useNavigate } from "react-router-dom";
import { GameSettings, GameState } from "../types/types.ts";
import { getDistance } from "geolib";
import SpacebarHandler from "./SpaceBarHandler.tsx";
import Timer from "./Timer.tsx";

function MapComponents({
  gameState,
  setGameState,
  gameSettings,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameSettings: GameSettings;
}) {
  const map = useMap();
  const [showREM, setShowREM] = useState(false);
  const [timer, setTimer] = useState(gameSettings.timed);
  const navigate = useNavigate();

  // Monitor timer and handle timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      handleEndRound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  // Calculate the max distance the user has moved from the
  // starting location during a round
  // and set it to gameState.distanceMoved (affects the round score!)
  function onMove() {
    const distanceMoved = getDistance(
      {
        latitude: gameState.locations[gameState.roundId].lat,
        longitude: gameState.locations[gameState.roundId].lng,
      },
      {
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng,
      },
    );

    if (distanceMoved > gameState.distanceMoved) {
      setGameState((prev) => ({
        ...prev,
        distanceMoved: distanceMoved,
      }));
    }
  }
  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, gameState.distanceMoved]);

  const handleCloseREM = () => {
    if (gameState.roundId < 4) {
      // Start a new round
      setShowREM(false);
      handleStartRound();
    } else {
      // End the game
      setShowREM(false);
      navigate("/");
    }
  };

  const handleShowREM = () => setShowREM(true);

  const handleStartRound = () => {
    // Center the viewMap to the new starting location and update gameState
    map.setView(
      gameState.locations[gameState.roundId + 1],
      gameState.zooms[gameState.roundId + 1],
      { animate: false },
    );
    setGameState((prev) => ({
      ...prev,
      roundId: prev.roundId + 1,
      distanceMoved: 0,
      picked: false,
    }));
  };

  const handleEndRound = () => {
    // Exit early if between rounds
    if (showREM) return;

    // Go through all different scenarios:
    // 1. Normal mode location not guessed
    // 2. Timed mode location not guessed
    // 3. Both modes location guessed
    if (gameState.picked === false) {
      if (!gameSettings.timed) {
        /* Normal mode */
        // Implement here notification to the user to make a guess
        console.log(
          "Select clicked without setting a guess of the location.",
          "Try again after making a guess.",
        );
        // Give the user chance to make a guess
        // by returning to the round
      } else {
        /* Timed mode */
        // Implement here notification to the user to be faster
        console.log(
          "Time run out before you made a guess of the location.",
          "Try being faster on the next round!",
        );
        // Score is set to 0 in the timed mode
        const score = 0;
        // Set round end calculations to the gameState
        setGameState((prev) => ({
          ...prev,
          guesses: prev.guesses.concat(undefined),
          score: prev.score.concat(score),
        }));
        // Continue to Round End Module
        handleShowREM();
      }
    } else {
      /* Both modes and a location guessed*/
      const guessedLocation = gameState.guesses[gameState.roundId];
      const correctLocation = gameState.locations[gameState.roundId];
      const distanceMoved = gameState.distanceMoved;

      // Narrow type
      if (guessedLocation === undefined) {
        throw new Error("Guessed location was undefined!");
      }

      // Pick score is the distance between the guess and the correct location in meters
      let pickScore = getDistance(
        {
          latitude: correctLocation.lat,
          longitude: correctLocation.lng,
        },
        {
          latitude: guessedLocation.lat,
          longitude: guessedLocation.lng,
        },
      );
      // Making a guess inside a threshold distance gives a perfect pick score
      const threshold = 30;
      pickScore = pickScore < threshold ? 0 : pickScore;

      // Score calculation formula
      const score = Math.max(10000 - pickScore * 2 - distanceMoved * 2.5, 0);

      // Set round end calculations to the gameState
      setGameState((prev) => ({ ...prev, score: prev.score.concat(score) }));
      // Continue to Round End Module
      handleShowREM();
    }
  };

  const handleSkipMap = () => {
    // Continue to Round End Module if it is the last round.
    // Else continue to a new round
    if (gameState.roundId === 4) {
      setGameState((prev) => ({ ...prev, score: prev.score.concat(0) }));
      setShowREM(true);
    } else {
      // Continue to the next round
      map.setView(
        gameState.locations[gameState.roundId + 1],
        gameState.zooms[gameState.roundId + 1],
        { animate: false },
      );
      // Prepare a new state for the next round
      setGameState((prev) => ({
        ...prev,
        roundId: prev.roundId + 1,
        guesses: prev.guesses.slice(0, prev.roundId).concat(L.latLng(0, 0)),
        score: prev.score.concat(0),
        distanceMoved: 0,
        picked: false,
        skipped: prev.skipped + 1,
      }));
    }
  };

  const handleResetMap = () => {
    map.setView(gameState.locations[gameState.roundId]);
  };

  const buttons = [
    { name: "Select", handler: handleEndRound },
    { name: "Reset", handler: handleResetMap },
    { name: "Skip", handler: handleSkipMap },
    { name: "Exit", handler: () => navigate("/") },
  ];

  return (
    <>
      {/* Round number and timer */}
      <div id="indicators">
        <Button id="round-indicator" variant="dark" disabled>
          {gameState.roundId + 1}/5
        </Button>
        {timer && <Timer timer={timer} setTimer={setTimer} />}
      </div>

      {/* Control buttons */}
      <div id="controls">
        {buttons.map((button) => (
          <Button id={button.name} variant="dark" onClick={button.handler}>
            {button.name}
          </Button>
        ))}
      </div>

      {/* Round end modal */}
      {showREM && (
        <RoundEndModal
          gameState={gameState}
          show={showREM}
          handleCloseREM={handleCloseREM}
        />
      )}

      <DevStats gameState={gameState} />
      <SpacebarHandler handlerFunction={handleEndRound} />
    </>
  );
}

export default MapComponents;
