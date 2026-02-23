import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import DevStats from "./DevStats.tsx";
import RoundEndModal from "./modals/RoundEndModal.tsx";
import { useNavigate } from "react-router-dom";
import { GameSettings, GameState, Timed } from "../types/types.ts";
import { getDistance } from "geolib";

function Timer({
  timer,
  setTimer,
}: {
  timer: Timed;
  setTimer: React.Dispatch<React.SetStateAction<Timed>>;
}) {
  // Render timer component only if timed mode is selected.
  if (timer === null) {
    return null;
  }
  // Minus 1 from the timer every 1000 ms
  if (timer !== 0) {
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  }
  // Return timer indicator
  return (
    <Button variant="dark" id="timer-indicator" disabled>
      {timer.toString()}
    </Button>
  );
}

function SelectButton({
  handleEndRound,
  timed,
}: {
  handleEndRound: () => void;
  timed: Timed;
}) {
  // Do not render select button if timed mode is selected.
  if (timed) {
    return null;
  }
  return (
    <>
      <Button
        id="select-button"
        variant="dark"
        onClick={() => handleEndRound()}
      >
        Select
      </Button>
    </>
  );
}

function SkipButton({ handleSkipMap }: { handleSkipMap: () => void }) {
  return (
    <>
      <Button id="select-button" variant="dark" onClick={() => handleSkipMap()}>
        Skip
      </Button>
    </>
  );
}

function ResButton({ handleResetMap }: { handleResetMap: () => void }) {
  return (
    <>
      <Button id="reset-button" variant="dark" onClick={() => handleResetMap()}>
        Reset map
      </Button>
    </>
  );
}

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
    setGameState((prev) => ({
      ...prev,
      roundId: prev.roundId + 1,
      distanceMoved: 0,
      picked: false,
    }));
    map.setView(
      gameState.locations[gameState.roundId + 1],
      gameState.zooms[gameState.roundId + 1],
      { animate: false },
    );
  };

  const handleEndRound = () => {
    // console.log('handleEndRound() called. GameState:', gameState)
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
        const emptyGuess = L.latLng(0, 0);
        // Set round end calculations to the gameState
        setGameState((prev) => ({
          ...prev,
          guesses: prev.guesses.concat(emptyGuess),
          score: prev.score.concat(score),
        }));
        // Continue to Round End Module
        handleShowREM();
      }
    } else {
      /* Both modes and a location guessed*/
      // Calculate the score of the guess
      const distanceMoved = gameState.distanceMoved;
      let pickScore = getDistance(
        {
          latitude: gameState.locations[gameState.roundId].lat,
          longitude: gameState.locations[gameState.roundId].lng,
        },
        {
          latitude: gameState.guesses[gameState.roundId].lat,
          longitude: gameState.guesses[gameState.roundId].lng,
        },
      );
      // Making a guess inside a threshold distance gives a perfect pick score
      const threshold = 10;
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

  return (
    <>
      <Button variant="dark" disabled id="round-indicator">
        {gameState.roundId < 5 ? gameState.roundId + 1 : 5}/5
      </Button>
      <Timer timer={timer} setTimer={setTimer} />
      <RoundEndModal
        gameState={gameState}
        show={showREM}
        handleCloseREM={handleCloseREM}
      />
      <div id="controls">
        <ResButton handleResetMap={handleResetMap} />
        <SelectButton
          handleEndRound={handleEndRound}
          timed={gameSettings.timed}
        />
        <SkipButton handleSkipMap={handleSkipMap} />
        <Button id="home-button" variant="dark" onClick={() => navigate("/")}>
          Exit
        </Button>
      </div>
      <DevStats gameState={gameState} />
    </>
  );
}

export default MapComponents;
