import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

function NextRound (
  { handleNext,
    closeREM,
    round,
  }: 
    { 
      handleNext: () => void, 
      closeREM: () => void,
      round: number,
  }) {

  function next () {
    closeREM()
    handleNext()
  }

  if (round < 5) {
    return (
      <>
        <Button variant="Primary" onClick={next}>
          Next
        </Button>
      </>
    )
  }
  return null
}

function RoundEndModal (
  { score,
    round,
    show,
    handleCloseREM,
    refreshMap,
  }:
    { score: number,
      round: number,
      show: boolean,
      handleCloseREM: () => void,
      refreshMap: () => void,
  }) 
  {
  return (
    <>
      <Modal 
        score={score}
        show={show}
        onHide={handleCloseREM}
        variant="dark"
        >
        <Modal.Header closeButton>
          <Modal.Title>Round {round} score:</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          {score} points! 
        </Modal.Body>
        <Modal.Footer>
          <NextRound handleNext={refreshMap} closeREM={handleCloseREM} round={round} />
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default RoundEndModal
