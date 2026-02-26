import { GameState } from "../types/types";

export default function GameSummary({ gameState }: { gameState: GameState }) {
  const totalScore = gameState.score.reduce((a, c) => a + c, 0);

  return (
    <div className="game-summary-content">
      <h4 className="fade-in">
        <b>You got</b>
      </h4>
      <div className="fade-in summary-points">
        <h2>{totalScore} / 50 000 points</h2>
        {totalScore !== 0 && (
          <meter
            value={totalScore}
            max={50000}
            low={20000}
            high={40000}
            optimum={50000}
          />
        )}
      </div>
      <div className="fade-in summary-rounds">
        <table>
          <thead>
            <tr>
              <td>Round</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody>
            {gameState.score.map((score, index) => (
              <tr>
                <td className="summary-round-id">{index + 1}</td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
