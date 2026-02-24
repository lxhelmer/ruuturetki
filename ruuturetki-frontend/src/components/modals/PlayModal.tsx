import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DailyChallenge, GameSettings, MapLayerName } from "../../types/types";
import { useState } from "react";
import {
  decadeForMapLayer,
  mapLayersForCity,
} from "../../utils/mapLayerHelpers";

function PlayModal({
  show,
  handleClosePlay,
  setGameSettings,
  gameSettings,
  setChallenge,
}: {
  show: boolean;
  handleClosePlay: () => void;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  gameSettings: GameSettings;
  setChallenge: React.Dispatch<
    React.SetStateAction<DailyChallenge | undefined>
  >;
}) {
  const navigate = useNavigate();
  const [city, setCity] = useState("Helsinki");

  const startGame = (mapName: MapLayerName) => {
    setGameSettings((prev) => ({ ...prev, ortolayer: mapName }));
    setChallenge(undefined);
    navigate("/game");
  };

  return (
    <>
      <Modal
        dialogClassName="play-modal-dialog"
        show={show}
        onHide={handleClosePlay}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Time to get mapping!</Modal.Title>
        </Modal.Header>
        <Modal.Body id="play-modal-body">
          {/* Game settings */}
          <h5 className="play-modal">Game settings</h5>
          <div className="play-modal-content">
            <Form>
              <Form.Check
                inline
                label="no moving"
                type="switch"
                onClick={() => {
                  console.log("Moving allowed?", !gameSettings.dragging);
                  setGameSettings((prev) => ({
                    ...prev,
                    dragging: !gameSettings.dragging,
                  }));
                }}
              />
              <Form.Check
                inline
                label="timed"
                type="switch"
                onClick={() => {
                  console.log("Timed mode?", !gameSettings.timed);
                  setGameSettings((prev) => ({
                    ...prev,
                    timed: prev.timed ? null : 15, // Switch between options null and 10
                  }));
                }}
              />
            </Form>
          </div>
          {/* City selection */}
          <h5 className="play-modal">City</h5>
          <div className="play-modal-content">
            <Form.Select
              className="city-selection"
              defaultValue={city}
              onChange={(event) => {
                setCity(event.currentTarget.value);
              }}
            >
              <option value="Helsinki">Helsinki</option>
              <option value="Turku">Turku</option>
              <option value="Tampere">Tampere</option>
            </Form.Select>
          </div>
          {/* Decades */}
          <h5 className="play-modal">Decade</h5>
          <div className="play-modal-content">
            {mapLayersForCity(city).map((mapName) => (
              <Button
                className="y-button"
                variant="secondary"
                key={mapName}
                onClick={() => {
                  startGame(mapName);
                }}
              >
                {/* Displayed button name for example "1940's" or "2010's" */}
                {decadeForMapLayer(mapName)}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlayModal;
