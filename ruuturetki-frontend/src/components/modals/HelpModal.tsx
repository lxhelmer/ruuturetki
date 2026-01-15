import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function HelpModal({
  show,
  handleCloseHelp,
}: {
  show: boolean;
  handleCloseHelp: () => void;
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseHelp}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>How to play?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>This is a simple game with 5 rounds.</h5>
            On each round you are shown a random spot around Helsinki. Your task
            is is to select the matching spot on the picker map. The maximum
            score per round is 10 000 which is decreased based on the amount you
            miss the mark and the amount you move away from the starting
            position. Ideally you would select the right position within a meter
            while not moving at all. You can skip a round, but forfit points
            from that round.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleCloseHelp()} variant="secondary">
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HelpModal;
