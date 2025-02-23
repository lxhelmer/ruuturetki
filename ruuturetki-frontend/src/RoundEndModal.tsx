import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

function ModalButton (
  { round, handleCloseREM }: { round: number, handleCloseREM: () => void}) 
{
  return (
    <>
      <Button variant="Primary" onClick={handleCloseREM}>
      {(round < 5) ? 'Next' : 'End'}
      </Button>
    </>
  )
}


function RoundEndModal (
  { score,
    round,
    show,
    handleCloseREM,
  }:
    { score: number,
      round: number,
      show: boolean,
      handleCloseREM: () => void,
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
          <ModalButton round={round} handleCloseREM={handleCloseREM}  />
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default RoundEndModal
