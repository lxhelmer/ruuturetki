import { Modal } from 'react-bootstrap'

function RoundEndModal (
  { score,
    show,
    handleCloseREM,
  }:
    { score: number,
      show: boolean,
      handleCloseREM: () => void,
  }) {
  return (
    <>
      <Modal 
        score={score}
        show={show}
        onHide={handleCloseREM}
        variant="dark"
        >
        <Modal.Header closeButton>
          <Modal.Title>Round 'x' score:</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          {score} points!
        </Modal.Body>
      </Modal>
    </>
  )
}
export default RoundEndModal
