import { useState } from "react";
import SelectionMap from "./SelectionMap.tsx";
import ViewMap from "./ViewMap.tsx";
import { GameState, GameSettings } from "../types/types.ts";
import getRandomLatLng from "../utils/getRandomLatLng.ts";

function Game({ gameSettings }: { gameSettings: GameSettings }) {
  const startState: GameState = {
    roundId: 0,
    locations: [...Array(5)].map(() => getRandomLatLng(gameSettings.city)),
    guesses: [],
    zooms: [...Array(5)].map(() => 17),
    score: [],
    distanceMoved: 0,
    picked: false,
    skipped: 0,
    user: null,
  };

  const [gameState, setGameState] = useState(startState);

  return (
    <>
      <SelectionMap
        gameState={gameState}
        setGameState={setGameState}
        gameSettings={gameSettings}
      />
      <ViewMap
        gameState={gameState}
        setGameState={setGameState}
        gameSettings={gameSettings}
      />
    </>
  );
}

export default Game;
