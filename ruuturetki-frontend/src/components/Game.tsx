import { useState } from "react";
import SelectionMap from "./SelectionMap.tsx";
import ViewMap from "./ViewMap.tsx";
import { GameState, GameSettings, DailyChallenge } from "../types/types.ts";
import getRandomLatLng from "../utils/getRandomLatLng.ts";
import L from "leaflet";

function Game({
  gameSettings,
  challenge,
}: {
  gameSettings: GameSettings;
  challenge?: DailyChallenge;
}) {
  let locations: L.LatLng[];
  let zooms: number[];

  // Get round locations and zooms from the challenge if provided
  // otherwise generate randomly
  if (challenge) {
    // From challenge
    locations = challenge.dailyChallenge.map((round) => L.latLng(round.latlng));
    zooms = challenge.dailyChallenge.map((round) => round.zoom);
  } else {
    // Generate random
    locations = [...Array(5)].map(() => getRandomLatLng(gameSettings.city));
    zooms = [...Array(5)].map(() =>
      gameSettings.city === "Helsinki" ? 17 : 18,
    ); // Zoom 17 for Helsinki, 18 for Turku
  }
  // console.log(locations, zooms);

  const startState: GameState = {
    roundId: 0,
    locations: locations,
    guesses: [],
    zooms: zooms,
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
