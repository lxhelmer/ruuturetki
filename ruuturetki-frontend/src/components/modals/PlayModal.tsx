import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
 
function PlayModal (
  { show,
    handleClosePlay,
  }:
    { show: boolean,
      handleClosePlay: () => void,
  }) 
  {

  return (
    <>
      <Modal 
        show={show}
        onHide={handleClosePlay}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default PlayModal
