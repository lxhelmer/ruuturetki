// Modified from - https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// Posted by - Dan Abramov https://danabra.mov/
// Retrieved 2025-12-29

import { useEffect, useRef } from 'react'

function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<(() => void) | null>(null)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval