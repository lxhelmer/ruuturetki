import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GameSettings } from "../../types/types";

function PlayModal({
  show,
  handleClosePlay,
  setGameSettings,
  gameSettings,
  ortolayersHelsinki,
  ortolayersTurku,
}: {
  show: boolean;
  handleClosePlay: () => void;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  gameSettings: GameSettings;
  ortolayersHelsinki: GameSettings["ortolayer"][];
  ortolayersTurku: GameSettings["ortolayer"][];
}) {
  const navigate = useNavigate();

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
          <Modal.Title>Time to get mapping!</Modal.Title>
        </Modal.Header>
        <Modal.Body id="play-modal-body">
          <label htmlFor="game-settings" className="play-modal-label">
            Game settings
          </label>
          <div id="game-settings">
            <Form>
              <Form.Check
                inline
                label="no moving"
                type="switch"
                onClick={() => {
                  console.log("Moving allowed?", !gameSettings.dragging);
                  setGameSettings({
                    ...gameSettings,
                    dragging: !gameSettings.dragging,
                  });
                }}
              />
              <Form.Check
                inline
                label="timed"
                type="switch"
                onClick={() => {
                  console.log("Timed mode?", !gameSettings.timed);
                  setGameSettings({
                    ...gameSettings,
                    timed: gameSettings.timed ? false : 15, // Switch between options false and 10
                  });
                }}
              />
            </Form>
          </div>
          <label htmlFor="helsinki" className="play-modal-label">
            Helsinki
          </label>
          <div id="helsinki">
            {/* Helsinki ortolayer buttons */}
            {ortolayersHelsinki.map((layerName) => (
              <Button
                className="y-button"
                variant="secondary"
                key={layerName}
                onClick={() => {
                  setGameSettings({
                    ...gameSettings,
                    ortolayer: layerName,
                  });
                  navigate("/game");
                }}
              >
                {/* Displayed button name for example "1940's" or "2010's" */}
                {layerName.match(/[0-9][0-9][0-9]/) + "0's"}
              </Button>
            ))}
          </div>
          <label htmlFor="turku" className="play-modal-label">
            Turku
          </label>
          <div id="turku">
            {/* Turku ortolayer buttons */}
            {ortolayersTurku.map((layerName) => (
              <Button
                className="y-button"
                variant="secondary"
                key={layerName}
                onClick={() => {
                  setGameSettings({
                    ...gameSettings,
                    ortolayer: layerName,
                  });
                  navigate("/game");
                }}
              >
                {/* Displayed button name for example "1950's" or "2020's" */}
                {layerName.match(/[0-9][0-9][0-9]/) + "0's"}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlayModal;
