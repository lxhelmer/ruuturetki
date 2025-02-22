import { Modal } from 'react-bootstrap'
import { useState } from 'react'

function RoundEndModal ({score}:{score: number}) {
      const [show, setShow] = useState(true)

        const handleClose = () => setShow(false)
        const handleShow = () => setShow(true)
  return (
    <>
      <Modal show={show}>
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
