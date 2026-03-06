import { useEffect } from "react";

/**
 * Pressing spacebar runs the provided function.
 */
export default function SpacebarHandler({
  handlerFunction,
}: {
  handlerFunction: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space") {
        e.preventDefault();
        handlerFunction();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlerFunction]);

  return null;
}
