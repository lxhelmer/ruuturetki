import { Button } from "react-bootstrap";
import { Timed } from "../types/types";

/**
 * Returns a timer indicator and decreases the timer value once every second.
 */
export default function Timer({
  timer,
  setTimer,
}: {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<Timed>>;
}) {
  // Minus 1 from the timer every 1000 ms
  if (timer !== 0) {
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  }
  // Return timer indicator
  return (
    <Button variant="dark" id="timer-indicator" disabled>
      {timer}
    </Button>
  );
}
